import { Metadata } from "next";
import SearchNoteForm from "@/components/templates/search-note-form";

export const metadata: Metadata = {
  title: "Search notes",
  description: "Search notes in seconds",
};

export default function SearchNotesPage() {
  return <SearchNoteForm />;
}
