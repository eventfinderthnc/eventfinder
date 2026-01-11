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
  menuContentClassname?: string;
  itemClassName?: string;
  id?: string;
  content: string[];
  panelLabel?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Dropdown({ children, ...props } : Arguments) {
  const [position, setPosition] = React.useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" id={props.id} className={"hover:text-white " + props.className}>
          { position? <span className="truncate">{position}</span> : children }
          { props.icon }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={props.menuContentClassname}>
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
                  {state}
                </DropdownMenuRadioItem>
              );
            })
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}