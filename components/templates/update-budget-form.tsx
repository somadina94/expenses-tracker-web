"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
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
import { getMonthName } from "@/utils/helpers";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const budgetSchema = z.object({
  amount: z.string({ error: "Amount is required" }),
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Month is required"),
});

const formSchema = budgetSchema;

export default function UpdateBudgetForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [budget, setBudget] = useState<Budget>();
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      month: "",
      year: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await budgetService.getBudgetById(
        params.id as string,
        access_token as string
      );
      if (res.status === 200) {
        setBudget(res.data.data.budget);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token, params]);

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
      router.back();
    } else {
      toast.error(response.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card className="max-w-120 mx-auto my-24 w-full">
      <CardHeader>
        <CardTitle>Update</CardTitle>
        <CardDescription>Update budget details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="amount"
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
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
            <Button type="submit">UPADTE</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
