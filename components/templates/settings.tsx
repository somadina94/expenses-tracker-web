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
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
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

export default function Settings() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    const res = await authService.deleteMe(access_token as string);
    if (res.status === 200) {
      toast.success(res.data.message);
      dispatch(logout());
      router.push("/");
    } else {
      toast.error(res.message);
    }
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
          <Button
            onClick={() => router.push("/dashboard/update-account")}
            asChild
            className="cursor-pointer text-white"
          >
            <div className="flex flex-row items-center gap-4">
              <IoCreateOutline />
              <span>Update account</span>
            </div>
          </Button>
          <Button
            onClick={() => router.push("/dashboard/update-password")}
            asChild
            className="cursor-pointer text-white"
          >
            <div className="flex flex-row items-center gap-4">
              <IoCreateOutline />
              <span>Update Password</span>
            </div>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild className="cursor-pointer">
              <Button asChild className="cursor-pointer" variant="destructive">
                <div className="flex flex-row items-center gap-4">
                  <IoTrashOutline />
                  <span>Delete account</span>
                </div>
              </Button>
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
