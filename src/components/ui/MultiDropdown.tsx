"use client";

import * as React from "react";
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

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
	/** Shown in the trigger when nothing is selected */
	placeholder?: string;
	/** Controlled: selected option labels (must match entries in `content`) */
	value?: string[];
};

type Checked = DropdownMenuCheckboxItemProps["checked"];

function buildCheckedMap(labels: string[] | undefined, content: string[]): Record<string, Checked> {
	if (!labels?.length) return {};
	const set = new Set(labels);
	const next: Record<string, Checked> = {};
	for (const item of content) {
		if (set.has(item)) next[item] = true;
	}
	return next;
}

export function MultiDropdown({ children, placeholder = "เลือกหมวดหมู่", value, ...props }: Arguments) {
	const [checkedStates, setCheckedStates] = React.useState<Record<string, Checked>>(() =>
		buildCheckedMap(value, props.content),
	);

	const contentKey = props.content.join("\u0000");
	React.useEffect(() => {
		if (value === undefined) return;
		setCheckedStates(buildCheckedMap(value, props.content));
	}, [value, contentKey]);

	const handleCheckedChange = (item: string, isChecked: Checked) => {
		setCheckedStates((prev) => {
			const updated = { ...prev, [item]: isChecked };

			const selectedValues = Object.entries(updated)
				.filter(([_, checked]) => checked)
				.map(([key]) => key);

			// Parent updates (e.g. react-hook-form setValue) must not run inside this updater —
			// it triggers "Cannot update CreatePage while rendering MultiDropdown".
			queueMicrotask(() => props.onMultiChange?.(selectedValues));
			return updated;
		});
	};

	const selectedLabels = Object.entries(checkedStates)
		.filter(([, checked]) => checked)
		.map(([key]) => key);
	const summaryText = selectedLabels.length > 0 ? selectedLabels.join(", ") : "";

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					id={props.id}
					className={cn(
						"w-full min-w-0 justify-between gap-2 font-normal text-left hover:bg-background",
						props.className,
					)}
				>
					<span className="min-w-0 flex-1 truncate text-left">{summaryText || children || placeholder}</span>
					{props.icon ?? <ChevronDown className="size-4 shrink-0 opacity-60" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn("p-1", props.menuContentClassName)}>
				{props.panelLabel && (
					<>
						<DropdownMenuLabel>{props.panelLabel}</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				)}
				{props.content.map((item, idx) => (
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
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
