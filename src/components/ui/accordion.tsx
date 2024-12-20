"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionRoot: React.FC<React.ComponentPropsWithoutRef<typeof Accordion.Root>> = ({ className, ...props }) => (
  <Accordion.Root className={cn("border", className)} {...props} />
);

const AccordionItem: React.FC<React.ComponentPropsWithoutRef<typeof Accordion.Item>> = ({ className, ...props }) => (
  <Accordion.Item className={cn("border-b", className)} {...props} />
);

const AccordionTrigger: React.FC<React.ComponentPropsWithoutRef<typeof Accordion.Trigger>> = ({ className, children, ...props }) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline data-[state=open]>svg:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </Accordion.Trigger>
  </Accordion.Header>
);

const AccordionContent: React.FC<React.ComponentPropsWithoutRef<typeof Accordion.Content>> = ({ className, children, ...props }) => (
  <Accordion.Content
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </Accordion.Content>
);

export { AccordionRoot as Accordion, AccordionItem, AccordionTrigger, AccordionContent };