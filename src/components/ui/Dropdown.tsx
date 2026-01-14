"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
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
  onOpenChange?: (open: boolean) => void;
}

export function Dropdown({ children, ...props } : Arguments) {
  const [position, setPosition] = React.useState("");
  return (
    <DropdownMenu onOpenChange={props.onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" id={props.id} className={"hover:text-white " + props.className}>
          { position? <span className="truncate">{position}</span> : children }
          { props.icon }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={props.menuContentClassName}>
        { props?.panelLabel && (<><DropdownMenuLabel>{props.panelLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator /></>) }
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {
            props.content.map((state, idx) => {
              return (
                <DropdownMenuRadioItem
                  value={state}
                  key={idx}
                  className={props.itemClassName}
                >
                  {<div className={`w-full flex items-center pl-4 py-1`}>{state}</div>}
                </DropdownMenuRadioItem>
              );
              // equivalent opaque color = 255 - P * (255 - transparent color)
              // #de5c8e4d
              // 255 - 0.23 * (255 - 208 - 14)
              // 255 - 0.23 * (255 - 80 - 12)
              // 255 - 0.23 * (255 - 128 - 14)
            })
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}