"use client";

import * as React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface AlertDialogProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const AlertDialogRoot: React.FC<AlertDialogProps> = ({ children, ...props }) => (
  <AlertDialog.Root {...props}>{children}</AlertDialog.Root>
);

export const AlertDialogTrigger: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Trigger
    className={cn("button-class-if-needed", className)}
    {...props}
  />
);

export const AlertDialogPortal: React.FC<AlertDialogProps> = ({ children, ...props }) => (
  <AlertDialog.Portal {...props}>{children}</AlertDialog.Portal>
);

export const AlertDialogOverlay: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
);

export const AlertDialogContent: React.FC<AlertDialogProps> = ({ className, children, ...props }) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialog.Content
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-background p-6 shadow-lg sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </AlertDialog.Content>
  </AlertDialogPortal>
);

export const AlertDialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

export const AlertDialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

export const AlertDialogTitle: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Title
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

export const AlertDialogDescription: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export const AlertDialogAction: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Action
    className={cn(buttonVariants(), className)}
    {...props}
  />
);

export const AlertDialogCancel: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Cancel
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
  />
);
