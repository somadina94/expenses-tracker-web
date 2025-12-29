import { Note } from "@/types";
import { trimToLength } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/dashboard/all-notes/${note._id}`)}
      className="hover:opacity-50 w-full cursor-pointer"
    >
      <CardContent className="flex flex-col">
        <span className="text-sm font-semibold text-foreground dark:text-white">
          {note.title}
        </span>
        <span className="text-sm text-foreground dark:text-white">
          {trimToLength(note.content, 56)}
        </span>
      </CardContent>
    </Card>
  );
}
