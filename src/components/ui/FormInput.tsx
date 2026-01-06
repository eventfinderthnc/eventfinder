import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/Textarea"
import { Dropdown } from "@/components/ui/Dropdown"
import { MultiDropdown } from "@/components/ui/MultiDropdown"
import { DatePicker } from "@/components/ui/DatePicker"
import { TimePicker } from "@/components/ui/TimePicker"
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
    isDate ?: boolean,
    isTime ?: boolean,
    isDropdown ?: boolean,
    isMultiDropdown ?: boolean,
    typeList ?: string[],
    categoryList ?: string[],
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((
    {className, 
        icon, 
        isTextArea = false, 
        isDate = false,
        isTime = false, 
        isDropdown = false, 
        isMultiDropdown = false, 
        typeList = [], 
        categoryList = [], 
        label, 
        placeholder, 
        type, 
        ...props}, ref) => {
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
                {isTextArea && (
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
                {isDropdown && (
                    <Dropdown 
                    content={typeList} 
                    className={cn(
                        "h-12 rounded-md border-[#D6D6D6] hover:bg-[#DE5C8E] focus:ring-0",
                        className,
                        )}>
                    </Dropdown>    
                )}
                {isMultiDropdown && (
                    <MultiDropdown
                    content={categoryList}
                    panelLabel="เลือกหมวดหมู่"
                    className={cn(
                        "h-12 rounded-md border-[#D6D6D6] hover:bg-[#DE5C8E]",
                        className,
                    )}/>
                )}
                {isDate && (
                    <DatePicker />
                )}
                {/* {isTime && (
                    <Input 
                    type='time'
                    className={cn(
                        "h-12 text-black border-[#D6D6D6]",
                        "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                        (label == null) && "mt-8.5",
                        className,
                    )}
                    />
                )} */}
                { isTime && (
                    <TimePicker />
                )}
                {!isTextArea && !isDropdown && !isMultiDropdown && !isDate && !isTime && (
                    <Input 
                    ref={ref}
                    placeholder={placeholder}
                    type={inputType}
                    className={cn(
                        "relative h-12 text-black border-[#D6D6D6]",
                        "placeholder:text-left placeholder:align-text-top",
                        (label == null) && "mt-8.5",
                        className,
                    )}
                    {...props}
                />)}
            </div>
        </div>
    );
});

export { FormInput }