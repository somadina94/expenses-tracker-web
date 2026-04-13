"use client";

import { useEffect } from "react";
import { useAppSelector, RootState, AuthState } from "@/store";
import { authService } from "@/services";
import { subscribeToPush } from "@/utils/subscribe-to-push-notification";
import { toast } from "sonner";
import Loading from "../atoms/loading";
import DashboardAnalytics from "./dashboard-analytics";
import { useBudgetsQuery } from "@/hooks/queries/use-budgets";
import { useExpensesQuery } from "@/hooks/queries/use-expenses";
import { useNotesQuery } from "@/hooks/queries/use-notes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Summaries() {
  const { user, access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const budgetQ = useBudgetsQuery(access_token ?? undefined);
  const expenseQ = useExpensesQuery(access_token ?? undefined);
  const noteQ = useNotesQuery(access_token ?? undefined);

  const loading =
    budgetQ.isPending || expenseQ.isPending || noteQ.isPending;

  const err =
    budgetQ.error?.message ||
    expenseQ.error?.message ||
    noteQ.error?.message;

  useEffect(() => {
    if (!access_token) return;
    const getToken = async () => {
      const subscribtionToken = await subscribeToPush();
      if (subscribtionToken) {
        let existing = false;
        for (const token of user?.webPushToken || []) {
          if (token.endpoint === subscribtionToken.endpoint) {
            existing = true;
            break;
          }
        }
        if (!existing) {
          const res = await authService.updateWebPushToken(
            access_token,
            subscribtionToken
          );
          if (res.status === 200) {
            toast.success(res.data.message);
          }
        }
      }
    };
    getToken();
  }, [access_token, user]);

  if (loading) {
    return <Loading />;
  }

  if (err) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Could not load dashboard</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <DashboardAnalytics
      budgets={budgetQ.data ?? []}
      expenses={expenseQ.data ?? []}
      notes={noteQ.data ?? []}
      currency={user?.currency ?? ""}
    />
  );
}
