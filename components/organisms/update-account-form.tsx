"use client";
import { useEffect, useMemo } from "react";
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
import { authService } from "@/services";
import {
  useAppDispatch,
  setUser,
  useAppSelector,
  RootState,
  AuthState,
} from "@/store";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

import { useCountriesQuery } from "@/hooks/queries/use-countries";
import Loading from "../atoms/loading";
import { User } from "@/types";
import { Edit } from "lucide-react";
import { Combobox } from "../ui/combobox";
import { motion } from "framer-motion";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  currency: z.string().min(1, "Currency is required"),
});

export default function UpdateAccountForm() {
  const { access_token, user } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const dispatch = useAppDispatch();
  const { data: countriesData, isPending: countriesLoading } =
    useCountriesQuery();

  const countries = useMemo(
    () =>
      (countriesData ?? []).map((el) => ({
        label: el.name,
        value: el.name,
      })),
    [countriesData]
  );
  const currencies = useMemo(
    () =>
      (countriesData ?? []).map((el) => ({
        label: el.currencyCode,
        value: el.currencyCode,
      })),
    [countriesData]
  );
  const router = useRouter();
  const queryClient = useQueryClient();

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

    if (response.status === 200) {
      toast.success(response.data.message);
      dispatch(setUser(response.data.data.user));
      await queryClient.invalidateQueries({ queryKey: queryKeys.me });
      router.back();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (user) {
      const parts = user.name.trim().split(/\s+/);
      form.reset({
        firstName: parts[0] ?? "",
        lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
        email: user.email,
        country: user.country,
        currency: user.currency,
      });
    }
  }, [user, form]);

  const cleanCurrencies = currencies.filter(
    (item) => typeof item.label === "string"
  );

  const {
    formState: { isSubmitting, isValid },
  } = form;

  if (countriesLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      className="mx-auto my-24 w-full max-w-xl px-4 sm:px-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      <Card className="w-full border-border/80 shadow-xl">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Update account</CardTitle>
          <CardDescription>Keep your profile and currency accurate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
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
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select a country"
                          searchPlaceholder="Search country..."
                          options={[...countries]
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((el) => ({
                              label: el.label,
                              value: el.label,
                            }))}
                        />
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
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select a currency"
                          searchPlaceholder="Search currency..."
                          options={Array.from(
                            new Map(
                              cleanCurrencies.map((item) => [item.label, item])
                            ).values()
                          )
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((el) => ({
                              label: el.label,
                              value: el.label,
                            }))}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <IconButton
                  Icon={Edit}
                  title="Save changes"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                />
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
