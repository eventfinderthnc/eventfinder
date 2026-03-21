"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

type Arguments = {
  className?: string;
  menuContentClassName?: string;
  itemClassName?: string;
  id?: string;
  content: string[];
  panelLabel?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  buttonName?: string;
  reactNode?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  /** Controlled: selected value (e.g. faculty name) */
  value?: string;
  /** Called when user picks an item; pass selected string (e.g. faculty name) */
  onValueChange?: (value: string) => void;
}

export function Dropdown({ children, ...props }: Arguments) {
  const [position, setPosition] = React.useState("");
  const displayValue = props.value ?? position;
  const handleChange = (v: string) => {
    if (props.value === undefined) setPosition(v);
    props.onValueChange?.(v);
  };
  return (
    <DropdownMenu onOpenChange={props.onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" id={props.id} className={"hover:text-white " + props.className}>
          {displayValue ? <span className="truncate">{displayValue}</span> : children}
          {props.icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("w-(--radix-dropdown-menu-trigger-width)", props.menuContentClassName)}>
        {props?.panelLabel && (
          <>
            <DropdownMenuLabel>{props.panelLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuRadioGroup value={displayValue} onValueChange={handleChange}>
          {props.content.map((state, idx) => (
            <DropdownMenuRadioItem
              value={state}
              key={idx}
              className={props.itemClassName}
            >
              <div className="flex w-full items-center py-1 pl-4">{state}</div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}