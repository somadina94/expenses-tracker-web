"use client";

import { Card, CardContent } from "@/components/ui/card";
import { authService } from "@/services";
import {
  useAppSelector,
  RootState,
  AuthState,
  useAppDispatch,
  logout,
} from "@/store";
import { toast } from "sonner";
import Loading from "../atoms/loading";
import InfoItem from "../atoms/info-item";
import { useRouter } from "next/navigation";
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
} from "../ui/alert-dialog";
import IconButton from "../atoms/IconButton";
import { AlertCircle, Edit, Trash } from "lucide-react";
import { useMeQuery } from "@/hooks/queries/use-me";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useState } from "react";

export default function Settings() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data: user, isPending, error } = useMeQuery(
    access_token ?? undefined
  );

  async function deleteHandler() {
    setIsDeleting(true);
    const res = await authService.deleteMe(access_token as string);
    if (res.status === 200) {
      toast.success(res.data.message);
      await queryClient.invalidateQueries();
      dispatch(logout());
      router.push("/");
    } else {
      toast.error(String(res.message));
    }
    setIsDeleting(false);
  }

  if (isPending) {
    return <Loading />;
  }

  if (error || !user) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ?? "Could not load profile."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <h2 className="font-display mb-6 text-2xl tracking-tight">Settings</h2>
      <Card className="mb-8 w-full border-border/80 shadow-sm">
        <CardContent className="pt-6">
          <InfoItem title="Name" value={user.name} />
          <InfoItem title="Email" value={user.email} />
          <InfoItem title="Country" value={user.country} />
          <InfoItem title="Currency" value={user.currency} />
        </CardContent>
      </Card>
      <Card className="w-full border-border/80 shadow-sm">
        <CardContent className="flex flex-col justify-between gap-4 pt-6 md:flex-row md:items-center">
          <IconButton
            onClick={() => router.push("/dashboard/update-account")}
            Icon={Edit}
            title="Update profile"
            type="button"
          />
          <IconButton
            onClick={() => router.push("/dashboard/update-password")}
            Icon={Edit}
            title="Update password"
            type="button"
          />

          <AlertDialog>
            <AlertDialogTrigger asChild className="cursor-pointer">
              <IconButton
                variant="destructive"
                Icon={Trash}
                title="Delete profile"
                type="button"
                isLoading={isDeleting}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes your Planary data. This cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={deleteHandler}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
