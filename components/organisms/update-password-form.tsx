"use client";
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
import { useAppSelector, RootState, AuthState } from "@/store";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

const formSchema = z.object({
  passwordCurrent: z.string().min(6, "Password must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string().min(6, "Password must be at least 6 characters"),
});

export default function UpdatePasswordForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const router = useRouter();

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await authService.updatePassword(
      access_token as string,
      data
    );

    if (response.status === 200) {
      toast.success(response.data.message);
      router.back();
    } else {
      toast.error(response.message);
    }
  };

  const {
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <div className="max-w-120 mx-auto my-24 p-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="passwordCurrent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
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
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
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
                      <FormLabel>Confirm new password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <IconButton
                  Icon={Edit}
                  title="UPADTE"
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
