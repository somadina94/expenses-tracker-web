"use client";

import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/context/redux-provider";
import { QueryProvider } from "@/context/query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <ReduxProvider>
          {children}
          <Toaster richColors position="top-center" />
        </ReduxProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
