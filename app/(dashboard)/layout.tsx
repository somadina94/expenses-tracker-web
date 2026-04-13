import type { Metadata } from "next";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/molecules/app-sidebar";
import PushProvider from "@/context/push-provider";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your Planary dashboard: spending trends, budgets, notes, and notifications in one place.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PushProvider />
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-6" />
            <span className="text-muted-foreground text-sm font-medium">
              Workspace
            </span>
          </header>
          <div className="flex flex-1 flex-col p-4 md:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
