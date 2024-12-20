"use client";

import * as Avatar from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const AvatarRoot = ({ className, ...props }) => (
  <Avatar.Root
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
);

const AvatarImage = ({ className, ...props }) => (
  <Avatar.Image
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);

const AvatarFallback = ({ className, ...props }) => (
  <Avatar.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
);

export { AvatarRoot as Avatar, AvatarImage, AvatarFallback };
