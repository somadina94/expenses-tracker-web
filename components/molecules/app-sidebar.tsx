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
  MENU_ITEMS_SINGLE,
  MENU_ITEMS_TOP,
} from "@/constants/menu-items";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LightDarkToggle } from "../ui/light-dark-toggle";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

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
        <SidebarGroup className="mb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="border-b">
                <SidebarMenuButton asChild>
                  <Link
                    href={MENU_ITEMS_TOP.url}
                    className="flex flex-row items-center gap-2"
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
                          <div className="flex items-center gap-2">
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
                              className="flex items-center gap-2 w-full"
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

        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS_SINGLE.map((item) => (
                <SidebarMenuItem className="border-b" key={item.title}>
                  <SidebarMenuButton asChild>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    </div>
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
