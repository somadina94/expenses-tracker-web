"use client";
import { Select } from "@radix-ui/react-select";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { budgetService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import { useRouter } from "next/navigation";
import { getMonthName } from "@/utils/helpers";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus } from "lucide-react";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
});

export default function AddBudgetForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      month: "",
      year: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await budgetService.createBudget(
      { amount: +data.amount, month: +data.month, year: +data.year },
      access_token as string
    );

    if (response.status === 201) {
      toast.success(response.data.message);
      router.push("/dashboard/all-budgets");
    } else {
      toast.error(response.message);
    }
  };

  const {
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <div className="p-2">
      <Card className="max-w-120 mx-auto my-24 w-full">
        <CardHeader>
          <CardTitle>Add</CardTitle>
          <CardDescription>Add a budget for the month</CardDescription>
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
                  Icon={Plus}
                  title="ADD BUDGET"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                />
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
