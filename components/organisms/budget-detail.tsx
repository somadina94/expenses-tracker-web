"use client";
import { useState, useEffect } from "react";
import { RootState, AuthState, useAppSelector } from "@/store";
import { budgetService } from "@/services";
import { Budget } from "@/types";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import DetailItem from "../atoms/detail-item";
import { formatAmount, getMonthName } from "@/utils/helpers";
import ActionItem from "../atoms/action-item";
import Loading from "../atoms/loading";

export default function BudgetDetail() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [budget, setBudget] = useState<Budget>();
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await budgetService.getBudgetById(
        params.id as string,
        access_token as string
      );
      if (res.status === 200) {
        setBudget(res.data.data.budget);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token, params]);

  async function onDelete() {
    const res = await budgetService.deleteBudget(
      budget?._id as string,
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
    <div className="max-w-200 w-full mx-auto ">
      <h2 className="text-2xl mb-4">Budget details</h2>
      <div className="flex flex-col gap-4">
        <DetailItem
          title="Amount"
          content={formatAmount(budget?.amount as number)}
        />
        <DetailItem
          title="Month"
          content={getMonthName(budget?.month as number)}
        />
        <DetailItem title="Year" content={budget?.year.toString()} />
        <ActionItem
          title="Are you absolutely sure?"
          message="Are you sure you want to delete this budget? there is no recovery."
          updateLink={`/dashboard/all-budgets/${budget?._id}/update`}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
