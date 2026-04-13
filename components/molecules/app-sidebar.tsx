"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  MENU_ITEMS,
  MENU_ITEMS_NOTIFICATION,
  MENU_ITEMS_SINGLE,
  MENU_ITEMS_TOP,
} from "@/constants/menu-items";
import {
  useAppSelector,
  RootState,
  AuthState,
  logout,
  useAppDispatch,
} from "@/store";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LightDarkToggle } from "../ui/light-dark-toggle";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { IoPowerOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useNotificationsQuery } from "@/hooks/queries/use-notifications";
import { Bell } from "lucide-react";

export function AppSidebar() {
  const { user, access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: notifications = [] } = useNotificationsQuery(
    access_token ?? undefined
  );

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );

  const nameParts = user?.name?.trim().split(/\s+/) ?? [];
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0] ?? ""}${nameParts[1][0] ?? ""}`.toUpperCase()
      : (nameParts[0]?.slice(0, 2).toUpperCase() ?? "?");
  const firstName = nameParts[0] ?? "there";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center gap-4 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex flex-row items-center gap-3">
                <Avatar className="rounded-lg border border-sidebar-border">
                  <AvatarFallback className="rounded-lg bg-sidebar-accent text-sidebar-accent-foreground text-sm font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate font-medium">
                  Hi, {firstName}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="border-b">
                <SidebarMenuButton asChild>
                  <Link
                    href={MENU_ITEMS_TOP.url}
                    className="flex flex-row items-center gap-3 text-primary p-2"
                  >
                    <MENU_ITEMS_TOP.icon />
                    <span>{MENU_ITEMS_TOP.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="border-b cursor-pointer">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <item.icon />
                            <span>{item.title}</span>
                          </div>

                          {/* Icon switch */}
                          <div className="flex items-center">
                            {/* Closed → Forward */}
                            <IoChevronForward
                              className="size-4 transition-transform
                         group-data-[state=open]/collapsible:hidden"
                            />

                            {/* Open → Down */}
                            <IoChevronDown
                              className="size-4 transition-transform
                         group-data-[state=closed]/collapsible:hidden"
                            />
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.sub_menu.map((menu) => (
                          <SidebarMenuSubItem key={menu.title}>
                            <Link
                              href={menu.url}
                              className="flex items-center gap-3 w-full text-primary p-1"
                            >
                              <menu.icon />
                              <span>{menu.title}</span>
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                className="border-b cursor-pointer"
                key={MENU_ITEMS_NOTIFICATION.title}
              >
                <SidebarMenuButton asChild>
                  <Link
                    href={MENU_ITEMS_NOTIFICATION.url}
                    className="flex flex-row items-center justify-between text-primary"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <Bell className="size-4 shrink-0" />
                      <span>{MENU_ITEMS_NOTIFICATION.title}</span>
                    </div>
                    {unreadNotifications.length > 0 && (
                      <span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS_SINGLE.map((item) => (
                <SidebarMenuItem
                  className="border-b cursor-pointer"
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex flex-row items-center justify-between text-primary"
                    >
                      <div className="flex flex-row items-center gap-3">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full h-full px-0">
              <div className="flex flex-row justify-between items-center gap-3 w-full">
                <LightDarkToggle />
                <button
                  onClick={() => {
                    router.push("/");
                    dispatch(logout());
                  }}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <IoPowerOutline />
                  <span>Sign out</span>
                </button>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
