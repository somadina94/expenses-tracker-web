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
} from "@/components/ui/sidebar";
import { MENU_ITEMS } from "@/constants/menu-items";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LightDarkToggle } from "../ui/light-dark-toggle";
import Link from "next/link";

export function AppSidebar() {
  const { user } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center gap-4 border-b">
        <Avatar className="rounded-lg">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>{`${user?.name[0]}${
            user?.name.split(" ")[1][0]
          }`}</AvatarFallback>
        </Avatar>
        <span>Hi, {user?.name.split(" ")[0].toLocaleUpperCase()}</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LightDarkToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
