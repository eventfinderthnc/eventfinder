import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"

const textareaVariants = cva(
	"border-input hover:border-primary focus:outline-none focus:border-primary placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Textarea({ 
  className, 
  variant = "default",
  ...props 
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      wrap="hard"
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }

