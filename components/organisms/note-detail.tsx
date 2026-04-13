"use client";

import { RootState, AuthState, useAppSelector } from "@/store";
import { noteService } from "@/services";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import DetailItem from "../atoms/detail-item";
import { formatRelativeDateTime } from "@/utils/helpers";
import ActionItem from "../atoms/action-item";
import Loading from "../atoms/loading";
import { useNoteQuery } from "@/hooks/queries/use-note";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function NoteDetail() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const queryClient = useQueryClient();

  const { data: note, isPending, error } = useNoteQuery(
    id,
    access_token ?? undefined
  );

  async function onDelete() {
    const res = await noteService.deleteNote(
      note?._id as string,
      access_token as string
    );

    if (res.status === 200) {
      toast.success(res.data.message);
      await queryClient.invalidateQueries({ queryKey: queryKeys.notes });
      router.back();
    } else {
      toast(String(res.message));
    }
  }

  if (isPending) {
    return <Loading />;
  }

  if (error || !note) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ?? "Note not found."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <h2 className="font-display mb-6 text-2xl tracking-tight">Note details</h2>
      <div className="flex flex-col gap-4">
        <DetailItem title="Title" content={note.title} />
        <DetailItem title="Content" content={note.content} />
        <DetailItem
          title="Reminder"
          content={formatRelativeDateTime(note.reminder as Date)}
        />
        <ActionItem
          title="Are you absolutely sure?"
          message="Are you sure you want to delete this note? there is no recovery."
          updateLink={`/dashboard/all-notes/${note._id}/update`}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
