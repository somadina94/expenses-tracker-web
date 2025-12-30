"use client";
import { useState } from "react";
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
import IconButton from "../atoms/IconButton";
import { Search } from "lucide-react";

const formSchema = z.object({
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
});

export default function SearchBudgetForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      month: "",
      year: "2026",
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
      {sortedBudgets.length === 0 && <NoResult />}
      <div className="flex flex-col gap-2">
        {sortedBudgets.map((budget) => (
          <BudgetItem key={budget._id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
