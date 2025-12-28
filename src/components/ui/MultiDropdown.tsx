"use client"

import * as React from "react"
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { z } from "zod";
import { Button } from "@/components/ui/Button"
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

const schema = z.object({
  className: z.string().optional(),
  content: z.array(z.string()),
  panelLabel: z.string().optional(),
  children: z.any().optional(),
});

type Arguments = z.infer<typeof schema>;

type Checked = DropdownMenuCheckboxItemProps["checked"]

// For me, dropdown doesn't necessarily need to have variant. I also have no idea what the variants should be. 

export function MultiDropdown({ children, ...props }: Arguments) {
  // Instead of using useState for each separate variable, we keep them as an array instead.
  const states = props.content.map((s) => {
    return React.useState<Checked>(false);
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={props.className + " hover:text-white"}>
          { children }
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        { props.panelLabel && (<><DropdownMenuLabel>{props.panelLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator /></>) }
        {
          states.map((state, idx) => {
            return (
              <DropdownMenuCheckboxItem
                checked={state[0]}
                onCheckedChange={state[1]}
                key={idx}
              >
                {props.content[idx]}
              </DropdownMenuCheckboxItem>
            );
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

