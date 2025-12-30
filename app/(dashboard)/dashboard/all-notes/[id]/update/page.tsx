import { Metadata } from "next";
import UpdateNoteForm from "@/components/templates/update-note";

export const metadata: Metadata = {
  title: "Note update",
  description: "Update your note",
};

export default function UpdateNotePage() {
  return <UpdateNoteForm />;
}
