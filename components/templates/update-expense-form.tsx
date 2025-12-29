"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { expenseService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Expense } from "@/types";
import { useParams, useRouter } from "next/navigation";
import Loading from "../atoms/loading";

const loginSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string({ error: "Amount is required" }),
  date: z.date({
    error: "Date is required",
  }),
  description: z.string().min(1, "Description is required"),
});

const formSchema = loginSchema;

export default function UpdateExpenseForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expense, setExpense] = useState<Expense>();
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "",
      date: undefined,
      description: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await expenseService.getExpense(
        params.id as string,
        access_token as string
      );
      if (res.status === 200) {
        setExpense(res.data.data.expense);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token, params]);

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
        <CardDescription>Update expense details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
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
                          e.target.value ? new Date(e.target.value) : undefined
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
                    <Input {...field} />
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
