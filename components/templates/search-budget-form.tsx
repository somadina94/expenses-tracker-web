"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { budgetService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import Loading from "../atoms/loading";
import { Budget } from "@/types";
import BudgetItem from "../molecules/budget-item";
import NoResult from "../atoms/no-result";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getMonthName } from "@/utils/helpers";

const searchBudgetSchema = z.object({
  month: z.string({
    error: "Month is required",
  }),
  year: z.string({
    error: "End date is required",
  }),
});

const formSchema = searchBudgetSchema;

export default function SearchBudgetForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: "",
      year: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await budgetService.getBudgets(
      access_token as string,
      +data.month,
      +data.year
    );

    if (response.status === 200) {
      setBudgets(response.data.data.budgets);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  const sortedBudgets = budgets
    .sort((a, b) => b.month - a.month)
    .sort((a, b) => b.year - a.year);

  return (
    <div className="max-w-200 mx-auto w-full">
      <Card className="w-full mb-12">
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-row justify-between items-center gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
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
              <Button type="submit">SEARCH</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <Loading />}
      {sortedBudgets.length === 0 && <NoResult />}
      <div className="flex flex-col gap-2">
        {sortedBudgets.map((budget) => (
          <BudgetItem key={budget._id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
