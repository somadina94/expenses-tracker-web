"use client";
import { useState, useEffect } from "react";
import NoteItem from "../molecules/note-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { noteService } from "@/services";
import { Note } from "@/types";
import { toast } from "sonner";
import Loading from "../atoms/loading";

export default function AllNotes() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await noteService.getNotes(access_token as string);
      if (res.status === 200) {
        setNotes(res.data.data.notes);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token]);

  const sortedNotes = notes.sort(
    (a, b) =>
      new Date(b.createdAt as Date).getTime() -
      new Date(a.createdAt as Date).getTime()
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full mx-auto p-2">
      <h2 className="text-2xl mb-4">All Notes</h2>
      <div className="flex flex-col items-center gap-4">
        {sortedNotes.map((note: Note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}
