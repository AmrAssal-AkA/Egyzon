"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, ClipboardList, Truck } from "lucide-react";

interface SpecItem {
  key: string;
  value: string;
}

interface ShippingInfo {
  delivery: string;
  method: string;
  returns: string;
  packaging: string;
}

interface ProductTabsProps {
  description: string;
  tags?: string[];
  specifications: SpecItem[];
  shipping: ShippingInfo;
}

export default function ProductTabs({
  description,
  tags = [],
  specifications,
  shipping,
}: ProductTabsProps) {
  return (
    <div className="w-full mt-12 border-t border-border pt-10">
      <Tabs defaultValue="description" className="w-full">
        <TabsList variant="line" className="w-full border-b border-border justify-start gap-6 h-10 px-0">
          <TabsTrigger
            value="description"
            className="flex items-center gap-2 pb-3 text-sm font-semibold rounded-none cursor-pointer focus-visible:outline-none"
          >
            <FileText className="w-4 h-4" />
            <span>Description</span>
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="flex items-center gap-2 pb-3 text-sm font-semibold rounded-none cursor-pointer focus-visible:outline-none"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Specifications</span>
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="flex items-center gap-2 pb-3 text-sm font-semibold rounded-none cursor-pointer focus-visible:outline-none"
          >
            <Truck className="w-4 h-4" />
            <span>Shipping</span>
          </TabsTrigger>
        </TabsList>

        {/* Description Panel */}
        <TabsContent value="description" className="mt-8 focus-visible:outline-none">
          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed flex flex-col gap-4 text-sm">
            <p className="text-foreground font-medium text-base">Product Overview</p>
            <p>{description}</p>
            {tags.length > 0 && (
              <div className="mt-4">
                <p className="text-foreground font-medium text-sm mb-2">Key Highlights</p>
                <ul className="list-disc pl-5 space-y-1">
                  {tags.map((tag) => (
                    <li key={tag} className="capitalize">
                      Premium {tag} collection quality
                    </li>
                  ))}
                  <li>Eco-friendly sourcing and verified merchant credentials</li>
                  <li>Durable construction built for daily usage</li>
                </ul>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Specifications Panel */}
        <TabsContent value="specifications" className="mt-8 focus-visible:outline-none">
          <div className="max-w-2xl border border-border rounded-xl overflow-hidden bg-background">
            <div className="grid grid-cols-1 divide-y divide-border">
              {specifications.map((spec, index) => (
                <div
                  key={`${spec.key}-${index}`}
                  className={`grid grid-cols-2 p-3.5 text-sm ${
                    index % 2 === 0
                      ? "bg-muted/10"
                      : "bg-background"
                  }`}
                >
                  <span className="font-semibold text-foreground">
                    {spec.key}
                  </span>
                  <span className="text-muted-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Shipping Panel */}
        <TabsContent value="shipping" className="mt-8 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="p-4 border border-border rounded-xl bg-muted/10 flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Estimated Delivery
              </span>
              <span className="text-sm font-medium text-foreground">
                {shipping.delivery}
              </span>
            </div>
            <div className="p-4 border border-border rounded-xl bg-muted/10 flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shipping Method
              </span>
              <span className="text-sm font-medium text-foreground">
                {shipping.method}
              </span>
            </div>
            <div className="p-4 border border-border rounded-xl bg-muted/10 flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Return Policy
              </span>
              <span className="text-sm font-medium text-foreground">
                {shipping.returns}
              </span>
            </div>
            <div className="p-4 border border-border rounded-xl bg-muted/10 flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Packaging
              </span>
              <span className="text-sm font-medium text-foreground">
                {shipping.packaging}
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
