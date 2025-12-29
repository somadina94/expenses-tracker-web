"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import Loading from "../atoms/loading";
import { Note } from "@/types";
import NoteItem from "../molecules/note-item";
import NoResult from "../atoms/no-result";

const searchExpenseSchema = z.object({
  startDate: z.date({
    error: "Start date is required",
  }),
  endDate: z.date({
    error: "End date is required",
  }),
});

const formSchema = searchExpenseSchema;

export default function SearchNoteForm() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await noteService.getNotes(
      access_token as string,
      data.startDate,
      data.endDate
    );

    if (response.status === 200) {
      setNotes(response.data.data.notes);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  const sortedNotes = notes.sort(
    (a, b) => new Date(b.reminder).getTime() - new Date(a.reminder).getTime()
  );

  return (
    <div className="max-w-200 mx-auto w-full">
      <Card className="w-full mb-12">
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-row justify-between items-center gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
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
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
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
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
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
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">SEARCH</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <Loading />}
      {sortedNotes.length === 0 && <NoResult />}
      <div className="flex flex-col gap-2">
        {sortedNotes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}
