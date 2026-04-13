import { useQuery } from "@tanstack/react-query";
import { noteService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Note } from "@/types";

async function fetchNote(id: string, token: string): Promise<Note> {
  const res = await noteService.getNote(id, token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string" ? res.message : "Failed to load note"
    );
  }
  return res.data.data.note as Note;
}

export function useNoteQuery(id: string | undefined, token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.note(id ?? ""),
    queryFn: () => fetchNote(id as string, token as string),
    enabled: Boolean(token && id),
  });
}
