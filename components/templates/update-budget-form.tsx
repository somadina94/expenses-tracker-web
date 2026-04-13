"use client";
import { useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { budgetService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Budget } from "@/types";
import { useParams, useRouter } from "next/navigation";
import Loading from "../atoms/loading";
import { useBudgetQuery } from "@/hooks/queries/use-budget";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getMonthName } from "@/utils/helpers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Edit } from "lucide-react";
import IconButton from "../atoms/IconButton";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
});

export default function UpdateBudgetForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const { data: budget, isPending, error } = useBudgetQuery(
    id,
    access_token ?? undefined
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      month: "",
      year: "",
    },
  });

  useEffect(() => {
    if (budget) {
      form.reset({
        amount: budget.amount.toString(),
        month: budget.month.toString(),
        year: budget.year.toString(),
      });
    }
  }, [budget, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await budgetService.updateBudget(
      budget?._id as string,
      {
        amount: +data.amount,
        month: +data.month,
        year: +data.year,
      },
      access_token as string
    );

    if (response.status === 200) {
      toast.success(response.data.message);
      await queryClient.invalidateQueries({ queryKey: queryKeys.budgets });
      await queryClient.invalidateQueries({ queryKey: queryKeys.budget(id) });
      router.back();
    } else {
      toast.error(response.message);
    }
  };

  if (isPending) {
    return <Loading />;
  }

  if (error || !budget) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ?? "Budget not found."}
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
        <CardTitle className="font-display text-2xl">Update budget</CardTitle>
        <CardDescription>Adjust amount, month, or year.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Month</SelectLabel>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                              (month) => (
                                <SelectItem
                                  key={month.toString()}
                                  value={month.toString()}
                                >
                                  {getMonthName(month)}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Year</SelectLabel>
                            {[
                              new Date().getFullYear() + 1,
                              new Date().getFullYear(),
                            ].map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <IconButton
                Icon={Edit}
                title="Update"
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
