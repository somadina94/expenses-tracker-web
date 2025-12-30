"use client";
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
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.date().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

export default function AddExpenseForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const router = useRouter();

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

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await expenseService.createExpense(
      {
        title: data.title,
        amount: +data.amount,
        date: data.date,
        description: data.description,
      },
      access_token as string
    );

    if (response.status === 201) {
      toast.success(response.data.message);
      router.push("/dashboard/all-expenses");
    } else {
      toast.error(response.message);
    }
  };

  const {
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <Card className="max-w-120 mx-auto my-24 w-full">
      <CardHeader>
        <CardTitle>Add</CardTitle>
        <CardDescription>Add your expense</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
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
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
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
                Icon={Plus}
                title="ADD EXPENSE"
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
