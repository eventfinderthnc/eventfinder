"use client"

import * as React from "react"

import { Button } from "@/components/ui/Button"
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

const schema = z.object({
  className: z.string().optional(),
  content: z.array(z.string()),
  panelLabel: z.string(),
  reactNode: z.any().optional(),
  buttonName: z.string().optional(),
});

type Arguments = z.infer<typeof schema>;

export function Dropdown(props: Arguments) {
  const [position, setPosition] = React.useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={props.className + " hover:text-white"}>
          { props.reactNode? props.reactNode : props.buttonName }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        { props.panelLabel && (<><DropdownMenuLabel>{props.panelLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator /></>) }
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {
            props.content.map((state, idx) => {
              return (
                <DropdownMenuRadioItem
                  value={state}
                  key={idx}
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
