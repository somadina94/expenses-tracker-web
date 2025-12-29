import {
  IoBarChartOutline,
  IoWalletOutline,
  IoDocumentsOutline,
  IoSettingsOutline,
  IoList,
  IoAdd,
  IoSearchOutline,
} from "react-icons/io5";
import { CiMoneyBill, CiBellOn } from "react-icons/ci";

export const MENU_ITEMS = [
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: CiMoneyBill,
    sub_menu: [
      {
        title: "All expenses",
        url: "/dashboard/all-expenses",
        icon: IoList,
      },
      {
        title: "Add expense",
        url: "/dashboard/add-expense",
        icon: IoAdd,
      },
      {
        title: "Search expense",
        url: "/dashboard/search-expense",
        icon: IoSearchOutline,
      },
    ],
  },
  {
    title: "Budget",
    url: "/dashboard/budget",
    icon: IoWalletOutline,
    sub_menu: [
      {
        title: "All budgets",
        url: "/dashboard/all-budgets",
        icon: IoList,
      },
      {
        title: "Add budget",
        url: "/dashboard/add-budget",
        icon: IoAdd,
      },
      {
        title: "Search budget",
        url: "/dashboard/search-budget",
        icon: IoSearchOutline,
      },
    ],
  },
  {
    title: "Notes",
    url: "/dashboard/notes",
    icon: IoDocumentsOutline,
    sub_menu: [
      {
        title: "All notes",
        url: "/dashboard/all-notes",
        icon: IoList,
      },
      {
        title: "Add note",
        url: "/dashboard/add-note",
        icon: IoAdd,
      },
      {
        title: "Search note",
        url: "/dashboard/search-note",
        icon: IoSearchOutline,
      },
    ],
  },
];

export const MENU_ITEMS_TOP = {
  title: "Summaries",
  url: "/dashboard",
  icon: IoBarChartOutline,
};

export const MENU_ITEMS_SINGLE = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: IoSettingsOutline,
  },
];

export const MENU_ITEMS_NOTIFICATION = {
  title: "Notifications",
  url: "/dashboard/all-notification",
  icon: CiBellOn,
};
