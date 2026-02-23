"use client";

import type React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabData {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface VercelTabsProps {
  tabs: TabData[];
  defaultTab?: string;
  className?: string;
}

export function VercelTabs({ tabs, defaultTab, className }: VercelTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className={`flex w-full flex-col items-center ${className}`}
    >
      <TabsList className="h-auto max-w-full flex-wrap justify-center gap-2 rounded-full border border-border/60 bg-card p-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`!flex-none !h-auto rounded-full border-0 px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground data-[state=active]:shadow-[var(--shadow-soft)] ${
              activeTab === tab.value
                ? "text-primary-foreground"
                : "text-foreground hover:text-primary"
            }`}
          >
            <span className="whitespace-nowrap">
              {tab.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Content Area */}
      <div className="mt-8 w-full px-4">
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="fade-in-50 w-full animate-in duration-500"
          >
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
