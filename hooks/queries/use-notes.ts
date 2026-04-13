import { useQuery } from "@tanstack/react-query";
import { noteService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Note } from "@/types";

async function fetchNotes(token: string): Promise<Note[]> {
  const res = await noteService.getNotes(token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string" ? res.message : "Failed to load notes"
    );
  }
  return res.data.data.notes as Note[];
}

export function useNotesQuery(token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.notes,
    queryFn: () => fetchNotes(token as string),
    enabled: Boolean(token),
  });
}
