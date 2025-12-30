import AddNoteForm from "@/components/templates/add-note";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add note",
  description: "Add a note and set reminder",
};

export default function AddNotePage() {
  return <AddNoteForm />;
}
