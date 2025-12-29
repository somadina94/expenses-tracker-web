"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

interface ActionItemProps {
  updateLink: string;
  onDelete: () => void;
  title: string;
  message: string;
}

export default function ActionItem({
  onDelete,
  updateLink,
  message,
  title,
}: ActionItemProps) {
  return (
    <Card className="max-w-200 w-full mx-auto bg-primary">
      <CardContent>
        <div className="flex flex-row justify-between items-center">
          <Link href={updateLink} className="flex flex-col items-center gap-2">
            <IoCreateOutline className="text-white" />
            <span className="text-sm text-white">Update</span>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild className="cursor-pointer">
              <Button asChild>
                <div className="flex flex-col items-center gap-2">
                  <IoTrashOutline className="text-white" />
                  <span className="text-sm text-white">Delete</span>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{message}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button asChild onClick={onDelete} variant="destructive">
                  <AlertDialogAction>Continue</AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
