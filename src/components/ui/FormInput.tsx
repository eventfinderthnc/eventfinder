import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/Textarea"
import { ChevronDown, SquarePlus, Link, CalendarDaysIcon, Clock} from "lucide-react"
import type { HTMLInputTypeAttribute } from "react"
import { forwardRef } from "react"

const iconVariants = {
    type: ChevronDown,
    category: SquarePlus,
    link: Link,
    date: CalendarDaysIcon,
    time: Clock
}

type iconType = keyof typeof iconVariants;

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    icon ?: iconType,
    label ?: string,
    placeholder ?: string,
    isTextArea ?: boolean,
    isDateTime ?: boolean,
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({className, icon, isTextArea, isDateTime, label, placeholder, type, ...props}, ref) => {
    const IconComponent = icon ? iconVariants[icon] : null;
    const inputType: HTMLInputTypeAttribute | undefined = icon == "date" ? "date" : (icon == "time" ? "time" : type);
    return (
        <div className="flex flex-col gap-2.5">
            {label && (
                <label className="text-black text-base font-bold">
                    {label}
                </label>
            )}
            <div className="relative w-full">
                {IconComponent && (
                    <div className={cn("absolute top-3 right-2.5 w-6 h-6 pointer-events-none",(label == null) && "mt-8.5")}>
                        <IconComponent color="#949494"/>
                    </div>
                )}
                { !isTextArea ?
                (<Input 
                    ref={ref}
                    placeholder={placeholder}
                    type={inputType}
                    className={cn(
                        "relative h-12 text-black border-[#D6D6D6]",
                        "placeholder:text-left placeholder:align-text-top",
                        isDateTime && [
                            "[&::-webkit-calendar-picker-indicator]:absolute",
                            "[&::-webkit-calendar-picker-indicator]:w-full",
                            "[&::-webkit-calendar-picker-indicator]:h-full",
                            "[&::-webkit-calendar-picker-indicator]:opacity-0",
                            "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
                            "appearance-none"
                        ],
                        (icon == "date") && "focus:bg-blue-500",
                        (icon == "time") && "",
                        (label == null) && "mt-8.5",
                        className,
                    )}
                    {...props}
                />) : (
                    <Textarea 
                    placeholder={placeholder}
                    className={cn(
                        "relative h-12 text-black border-[#D6D6D6] focus-visible:ring-0 resize-none",
                        "pt-3 pb-3 px-3 text-left align-top",
                        "placeholder:text-left placeholder:align-text-top",
                        className,
                    )}
                    />
                )}
            </div>
        </div>
    );
});

export { FormInput }