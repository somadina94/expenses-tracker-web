"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
import { useAppDispatch, login, setUser } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCountries } from "@/utils/fetch-countries-currencies";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const loginSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z
    .string()
    .min(6, "Password confirm must be at least 6 characters"),
  country: z.string().min(1, "Country is required"),
  currency: z.string().min(1, "Currency is required"),
  terms: z.literal(true, {
    message: "You must accept the terms and conditions",
  }),
});

const formSchema = loginSchema;

export default function SignupForm() {
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
      password: "",
      passwordConfirm: "",
      terms: true,
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
    const parsedData = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      country: data.country,
      currency: data.currency,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    };
    const response = await authService.signup(parsedData);

    if (response.status === 201) {
      toast.success(response.data.message);
      form.reset();
      dispatch(setUser(response.data.data.user));
      dispatch(login(response.data.token));
    } else {
      toast.error(response.message);
    }
  };

  const cleanCurrencies = currencies.filter(
    (item) => typeof item.label === "string"
  );

  return (
    <Card className="max-w-120 mx-auto my-24 w-full">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register, explore and be able to plan better
        </CardDescription>
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***************"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***************"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">REGISTER</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Already have an account?{" "}
          <Link href="sign-in" className="text-primary">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
