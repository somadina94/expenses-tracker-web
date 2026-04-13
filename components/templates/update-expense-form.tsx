"use client";
import { useEffect } from "react";
import IconButton from "../atoms/IconButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { expenseService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import { useParams, useRouter } from "next/navigation";
import Loading from "../atoms/loading";
import { AlertCircle, Edit } from "lucide-react";
import { useExpenseQuery } from "@/hooks/queries/use-expense";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.date().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

export default function UpdateExpenseForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const { data: expense, isPending, error } = useExpenseQuery(
    id,
    access_token ?? undefined
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      amount: "",
      date: undefined,
      description: "",
    },
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        title: expense.title,
        amount: expense.amount.toString(),
        date: new Date(expense.date),
        description: expense.description,
      });
    }
  }, [expense, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await expenseService.updateExpense(
      expense?._id as string,
      {
        title: data.title,
        amount: +data.amount,
        date: data.date,
        description: data.description,
      },
      access_token as string
    );

    if (response.status === 200) {
      toast.success(response.data.message);
      await queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      await queryClient.invalidateQueries({ queryKey: queryKeys.expense(id) });
      router.back();
    } else {
      toast.error(response.message);
    }
  };

  if (isPending) {
    return <Loading />;
  }

  if (error || !expense) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ?? "Expense not found."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const {
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <Card className="max-w-120 mx-auto my-24 w-full">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Update expense</CardTitle>
        <CardDescription>Edit title, amount, date, or notes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value
                            ? (() => {
                                const d = field.value;
                                const y = d.getFullYear();
                                const m = String(d.getMonth() + 1).padStart(
                                  2,
                                  "0"
                                );
                                const day = String(d.getDate()).padStart(
                                  2,
                                  "0"
                                );
                                return `${y}-${m}-${day}`;
                              })()
                            : ""
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          if (!v) {
                            field.onChange(undefined);
                            return;
                          }
                          const [y, mo, d] = v.split("-").map(Number);
                          field.onChange(
                            new Date(y, mo - 1, d, 12, 0, 0, 0)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <IconButton
                Icon={Edit}
                title="UPADTE"
                type="submit"
                disabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
              />
            </fieldset>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
