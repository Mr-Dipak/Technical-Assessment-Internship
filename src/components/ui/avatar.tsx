"use client";

import * as Avatar from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface AvatarProps extends ComponentProps<typeof Avatar.Root> {}

const AvatarRoot = ({ className, ...props }: AvatarProps) => (
  <Avatar.Root
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
);

const AvatarImage = ({
  className,
  ...props
}: ComponentProps<typeof Avatar.Image>) => (
  <Avatar.Image
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);

const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof Avatar.Fallback>) => (
  <Avatar.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
);

export { AvatarRoot as Avatar, AvatarImage, AvatarFallback };
