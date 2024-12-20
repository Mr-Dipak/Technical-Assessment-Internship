"use client";

import { ReactNode, HTMLAttributes } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Root component
export const Dialog = DialogPrimitive.Root;

// Trigger component
export const DialogTrigger = DialogPrimitive.Trigger;

// Portal component
export interface DialogPortalProps {
  children: ReactNode;
  container?: HTMLElement;
}
export const DialogPortal = ({ children, container }: DialogPortalProps) => (
  <DialogPrimitive.Portal container={container}>{children}</DialogPrimitive.Portal>
);

// Overlay component
export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/60 dark:bg-black/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
);

// Content component
export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}
export const DialogContent = ({ className, children, ...props }: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute top-4 right-4 rounded-sm p-2 text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

// Header component
export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={cn("text-center sm:text-left space-y-2", className)} {...props} />
);

// Footer component
export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2",
      className
    )}
    {...props}
  />
);

// Title component
export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}
export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn("text-lg font-bold text-foreground", className)}
    {...props}
  />
);

// Description component
export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}
export const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
