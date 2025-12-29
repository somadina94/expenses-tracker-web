"use client";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { authService } from "@/services";
import {
  useAppDispatch,
  setUser,
  useAppSelector,
  RootState,
  AuthState,
} from "@/store";

import { fetchCountries } from "@/utils/fetch-countries-currencies";
import { User } from "@/types";

const loginSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  currency: z.string().min(1, "Currency is required"),
});

const formSchema = loginSchema;

export default function UpdateAccountForm() {
  const { access_token, user } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [currencies, setCurrencies] = useState<
    { label: string; value: string }[]
  >([]);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      currency: "",
    },
  });

  useEffect(() => {
    const fetchCountriesData = async () => {
      const res = await fetchCountries();
      if (res) {
        setCountries(
          res.map((el: { name: string }) => {
            return { label: el.name, value: el.name };
          })
        );
        setCurrencies(
          res.map((el: { currencyCode: string }) => {
            return { label: el.currencyCode, value: el.currencyCode };
          })
        );
      }
    };
    fetchCountriesData();
  }, [setCountries, setCurrencies]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const parsedData: User = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      country: data.country,
      currency: data.currency,
    };
    const response = await authService.updateMe(
      access_token as string,
      parsedData
    );

    console.log(parsedData);

    if (response.status === 200) {
      toast.success(response.data.message);
      dispatch(setUser(response.data.data.user));
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        email: user.email,
        country: user.country,
        currency: user.currency,
      });
    }
  }, [user, form]);

  const cleanCurrencies = currencies.filter(
    (item) => typeof item.label === "string"
  );

  return (
    <Card className="max-w-120 mx-auto my-24 w-full">
      <CardHeader>
        <CardTitle>Update</CardTitle>
        <CardDescription>Update your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      key={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Country</SelectLabel>
                          {[...countries]
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((el) => (
                              <SelectItem key={el.label} value={el.label}>
                                {el.label}
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

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Select
                      key={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Currency</SelectLabel>
                          {Array.from(
                            new Map(
                              cleanCurrencies.map((item) => [item.label, item])
                            ).values()
                          )
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((el) => (
                              <SelectItem key={el.label} value={el.label}>
                                {el.label}
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
            <Button type="submit">UPDATE</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
