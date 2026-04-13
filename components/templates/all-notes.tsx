"use client";

import NoteItem from "../molecules/note-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { Note } from "@/types";
import Loading from "../atoms/loading";
import NoResult from "../atoms/no-result";
import { useNotesQuery } from "@/hooks/queries/use-notes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AllNotes() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const { data: notes = [], isPending, error } = useNotesQuery(
    access_token ?? undefined
  );

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.createdAt as Date).getTime() -
      new Date(a.createdAt as Date).getTime()
  );

  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <h2 className="font-display mb-6 text-2xl tracking-tight">All notes</h2>
      {sortedNotes.length === 0 && <NoResult />}
      {sortedNotes.length > 0 && (
        <div className="flex flex-col items-stretch gap-4">
          {sortedNotes.map((note: Note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
