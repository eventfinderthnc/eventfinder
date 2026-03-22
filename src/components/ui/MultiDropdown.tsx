"use client"

import * as React from "react"
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { z } from "zod";
import { Button } from "@/components/ui/Button"
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

type Arguments = {
  className?: string;
  menuContentClassName?: string;
  checkBoxItemClassName?: string;
  id?: string;
  content: string[];
  panelLabel?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onMultiChange?: (selectedValues: string[]) => void;
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

// For me, dropdown doesn't necessarily need to have variant. I also have no idea what the variants should be. 

export function MultiDropdown({ children, ...props }: Arguments) {
  // Instead of using useState for each separate variable, we keep them as an array instead.
  // const states = props.content.map((s) => {
  //   return React.useState<Checked>(false);
  // });
  const [checkedStates, setCheckedStates] = React.useState<Record<string, Checked>>({});

  const handleCheckedChange = (item: string, isChecked: Checked) => {
    setCheckedStates((prev) => {
        const updated = { ...prev, [item]: isChecked }
        
        const selectedValues = Object.entries(updated)
            .filter(([_, checked]) => checked)
            .map(([key]) => key)
        
        props.onMultiChange?.(selectedValues)
        return updated
    })
}

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" id={props.id} className={"hover:text-white " + props.className}>
          { children }
          { props.icon }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("w-(--radix-dropdown-menu-trigger-width)", props.menuContentClassName)}>
        { props.panelLabel && (<><DropdownMenuLabel>{props.panelLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator /></>) }
        {
          // states.map((state, idx) => {
          //   return (
          //     <DropdownMenuCheckboxItem
          //       checked={state[0]}
          //       onCheckedChange={state[1]}
          //       key={idx}
          //     >
          //       {props.content[idx]}
          //     </DropdownMenuCheckboxItem>
          //   );
          // })
          props.content.map((item, idx) => {
            return (
              <DropdownMenuCheckboxItem
                className={props.checkBoxItemClassName}
                checked={checkedStates[item] ?? false}
                onCheckedChange={(checked) => handleCheckedChange(item, checked)}
                key={idx}
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                {item}
              </DropdownMenuCheckboxItem>
            );
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}