"use client";
import Header from "@/components/header";
import { RateCardTabs } from "@/components/rate-card-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function Page() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div className=" grow bg-white dark:bg-[#252526] max-w-4xl rounded-lg p-4 space-y-8">
        <Header />
        <RateCardTabs />
      </div>
    </QueryClientProvider>
  );
}
