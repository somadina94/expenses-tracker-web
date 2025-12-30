import { Metadata } from "next";
import NoteDetail from "@/components/organisms/note-detail";

export const metadata: Metadata = {
  title: "Note",
  description: "Note details",
};

export default function NoteDetailPage() {
  return <NoteDetail />;
}
