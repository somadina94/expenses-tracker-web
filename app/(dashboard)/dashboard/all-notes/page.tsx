import { Metadata } from "next";
import AllNotes from "@/components/templates/all-notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "List of all your notes",
};

export default function AllNotesPage() {
  return <AllNotes />;
}
