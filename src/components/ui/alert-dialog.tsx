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

const AlertDialogRoot: React.FC<AlertDialogProps> = ({ ...props }) => (
  <AlertDialog.Root {...props} />
);

const AlertDialogTrigger: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Trigger className={cn(buttonVariants({ variant: "default" }), className)} {...props} />
);

const AlertDialogContent: React.FC<AlertDialogProps> = ({ className, children, ...props }) => (
  <AlertDialog.Portal>
    <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
    <AlertDialog.Content
      className={cn(
        "fixed top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </AlertDialog.Content>
  </AlertDialog.Portal>
);

const AlertDialogTitle: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Title className={cn("text-lg font-medium", className)} {...props} />
);

const AlertDialogDescription: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Description className={cn("mt-2 text-sm text-gray-500", className)} {...props} />
);

const AlertDialogAction: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Action className={cn(buttonVariants({ variant: "default" }), className)} {...props} />
);

const AlertDialogCancel: React.FC<AlertDialogProps> = ({ className, ...props }) => (
  <AlertDialog.Cancel className={cn(buttonVariants({ variant: "secondary" }), className)} {...props} />
);

export {
  AlertDialogRoot as AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};