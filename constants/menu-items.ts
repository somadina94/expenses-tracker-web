import {
  IoBarChartOutline,
  IoWalletOutline,
  IoDocumentsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { CiMoneyBill, CiBellOn } from "react-icons/ci";

export const MENU_ITEMS = [
  {
    title: "Summaries",
    url: "/dashboard",
    icon: IoBarChartOutline,
  },
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: CiMoneyBill,
  },
  {
    title: "Budget",
    url: "/dashboard/budget",
    icon: IoWalletOutline,
  },
  {
    title: "Notes",
    url: "/dashboard/notes",
    icon: IoDocumentsOutline,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: CiBellOn,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: IoSettingsOutline,
  },
];
