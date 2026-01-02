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
import { noteService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";

import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  reminder: z.string().optional(),
});

export default function AddNoteForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const router = useRouter();

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      reminder: undefined,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await noteService.createNote(
      {
        title: data.title,
        content: data.content,
        reminder: new Date(data.reminder as string),
      },
      access_token as string
    );

    if (response.status === 201) {
      toast.success(response.data.message);
      router.push("/dashboard/all-notes");
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
          <CardDescription>Add a new note and set reminder</CardDescription>
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
                  name="reminder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <IconButton
                  Icon={Plus}
                  title="ADD NOTE"
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
