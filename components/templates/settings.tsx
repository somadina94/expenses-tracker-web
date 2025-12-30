"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authService } from "@/services";
import {
  useAppSelector,
  RootState,
  AuthState,
  useAppDispatch,
  logout,
} from "@/store";
import { User } from "@/types";
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
import { Edit, Trash } from "lucide-react";

export default function Settings() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await authService.getMe(access_token as string);
      if (res.status === 200) {
        setUser(res.data.data.user);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token]);

  async function deleteHandler() {
    setIsDeleting(true);
    const res = await authService.deleteMe(access_token as string);
    if (res.status === 200) {
      toast.success(res.data.message);
      dispatch(logout());
      router.push("/");
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full p-2 mx-auto">
      <h2 className="text-2xl mb-4">Settings</h2>
      <Card className="w-full mb-12">
        <CardContent>
          <InfoItem title="Name" value={user?.name as string} />
          <InfoItem title="Email" value={user?.email as string} />
          <InfoItem title="Country" value={user?.country as string} />
          <InfoItem title="Currency" value={user?.currency as string} />
        </CardContent>
      </Card>
      <Card className="w-full mb-12">
        <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <IconButton
            onClick={() => router.push("/dashboard/update-account")}
            Icon={Edit}
            title="Update profile"
            type="submit"
            // disabled={!isValid || isSubmitting}
            // isLoading={isSubmitting}
          />
          <IconButton
            onClick={() => router.push("/dashboard/update-password")}
            Icon={Edit}
            title="Update password"
            type="submit"
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
                <AlertDialogTitle>Are your absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you absolutely sure you want to delete your account? All
                  information you have with us will be deletd and there is no
                  recovery option.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button asChild onClick={deleteHandler} variant="destructive">
                  <AlertDialogAction>Continue</AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
