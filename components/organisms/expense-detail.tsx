"use client";
import { useState, useEffect } from "react";
import { RootState, AuthState, useAppSelector } from "@/store";
import { expenseService } from "@/services";
import { Expense } from "@/types";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import DetailItem from "../atoms/detail-item";
import { formatAmount, formatDate } from "@/utils/helpers";
import ActionItem from "../atoms/action-item";
import Loading from "../atoms/loading";

export default function ExpenseDetail() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [expense, setExpense] = useState<Expense>();
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await expenseService.getExpense(
        params.id as string,
        access_token as string
      );
      if (res.status === 200) {
        setExpense(res.data.data.expense);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token, params]);

  async function onDelete() {
    const res = await expenseService.deleteExpense(
      expense?._id as string,
      access_token as string
    );

    if (res.status === 200) {
      toast(res.data.message);
      router.back();
    } else {
      toast(res.message);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full mx-auto p-2">
      <h2 className="text-2xl mb-4">Expense details</h2>
      <div className="flex flex-col gap-4">
        <DetailItem title="Title" content={expense?.title as string} />
        <DetailItem
          title="Amount"
          content={formatAmount(expense?.amount as number)}
        />
        <DetailItem title="Date" content={formatDate(expense?.date)} />
        <DetailItem
          title="Description"
          content={expense?.description as string}
          className="w-full"
        />
        <ActionItem
          title="Are you absolutely sure?"
          message="Are you sure you want to delete this expense? there is no recovery."
          updateLink={`/dashboard/all-expenses/${expense?._id}/update`}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
