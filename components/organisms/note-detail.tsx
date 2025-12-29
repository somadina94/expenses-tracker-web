"use client";
import { useState, useEffect } from "react";
import { RootState, AuthState, useAppSelector } from "@/store";
import { noteService } from "@/services";
import { Note } from "@/types";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import DetailItem from "../atoms/detail-item";
import { formatRelativeDateTime } from "@/utils/helpers";
import ActionItem from "../atoms/action-item";
import Loading from "../atoms/loading";

export default function NoteDetail() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [note, setNote] = useState<Note>();
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  async function onDelete() {
    const res = await noteService.deleteNote(
      note?._id as string,
      access_token as string
    );

    if (res.status === 200) {
      toast(res.data.message);
      router.back();
    } else {
      toast(res.message);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full mx-auto ">
      <h2 className="text-2xl mb-4">Budget details</h2>
      <div className="flex flex-col gap-4">
        <DetailItem title="Title" content={note?.title} />
        <DetailItem
          title="Reminder"
          content={formatRelativeDateTime(new Date(note?.reminder as Date))}
        />
        <DetailItem title="Content" content={note?.content} />
        <ActionItem
          title="Are you absolutely sure?"
          message="Are you sure you want to delete this note? there is no recovery."
          updateLink={`/dashboard/all-notes/${note?._id}/update`}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
