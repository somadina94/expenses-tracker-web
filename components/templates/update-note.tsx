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
import { noteService } from "@/services";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Note } from "@/types";
import { useParams, useRouter } from "next/navigation";
import Loading from "../atoms/loading";
import { Textarea } from "../ui/textarea";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string({ error: "Content is required" }),
  reminder: z.string().optional(),
});

const formSchema = noteSchema;

export default function UpdateNoteForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [note, setNote] = useState<Note>();
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      reminder: undefined,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await noteService.getNote(
        params.id as string,
        access_token as string
      );
      if (res.status === 200) {
        setNote(res.data.data.note);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token, params]);

  useEffect(() => {
    if (note) {
      const localDateTime = new Date(
        new Date(note.reminder).getTime() -
          new Date(note.reminder).getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      form.reset({
        title: note.title,
        content: note.content,
        reminder: localDateTime,
      });
    }
  }, [note, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await noteService.updateNote(
      note?._id as string,
      {
        title: data.title,
        content: data.content,
        reminder: new Date(data.reminder as string),
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
        <CardDescription>Update note details</CardDescription>
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
            <Button type="submit">UPADTE</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
