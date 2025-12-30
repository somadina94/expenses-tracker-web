"use client";
import { useState } from "react";
import IconButton from "../atoms/IconButton";
import { Card, CardContent } from "@/components/ui/card";
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
import { expenseService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import Loading from "../atoms/loading";
import { Expense } from "@/types";
import ExpenseItem from "../molecules/expense-item";
import NoResult from "../atoms/no-result";
import { Search } from "lucide-react";

const formSchema = z.object({
  startDate: z.date().min(1, "Start date is required"),
  endDate: z.date().min(1, "End date is required"),
});

export default function SearchExpenseForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await expenseService.getExpenses(
      access_token as string,
      data.startDate,
      data.endDate
    );

    if (response.status === 200) {
      setExpenses(response.data.data.expenses);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const {
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <div className="max-w-200 mx-auto w-full p-2">
      <Card className="w-full mb-12 mx-auto">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset
                disabled={isSubmitting}
                className="flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start date</FormLabel>
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
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start date</FormLabel>
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
                <IconButton
                  Icon={Search}
                  title="SEARCH"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                />
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <Loading />}
      {sortedExpenses.length === 0 && <NoResult />}
      <div className="flex flex-col gap-2">
        {sortedExpenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
