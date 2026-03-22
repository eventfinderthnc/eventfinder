"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

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
};

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
				<Button
					variant="outline"
					id={props.id}
					className={cn(
						"w-full min-w-0 justify-between gap-2 font-normal text-left hover:bg-background",
						props.className,
					)}
				>
					<span className="min-w-0 flex-1 truncate text-left">{displayValue ? displayValue : children}</span>
					{props.icon}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn("p-1", props.menuContentClassName)}>
				{props?.panelLabel && (
					<>
						<DropdownMenuLabel>{props.panelLabel}</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuRadioGroup value={displayValue} onValueChange={handleChange}>
					{props.content.map((state, idx) => (
						<DropdownMenuRadioItem value={state} key={idx} className={props.itemClassName}>
							{state}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
