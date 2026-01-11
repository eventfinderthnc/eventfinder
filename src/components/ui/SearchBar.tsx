import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement>{
  searchIconClassName ?: string,
  inputClassName ?: string,
}

export function SearchBar({ className, searchIconClassName, inputClassName, ...props }: SearchBarProps) {
  return (
    <div 
      className={cn("relative w-full min-w-sm", className)} 
      {...props}
    >
      <Search color="#757575" className={cn("absolute left-4 top-3 h-6 w-6", searchIconClassName)} />
      <Input
        type="search"
        placeholder="ค้นหา"
        className={cn(
          "h-12 pl-12.5 md:text-base rounded-xl placeholder:text-[#757575] placeholder:text-base [&::-webkit-search-cancel-button]:hidden border-[#D6D6D6]",
          inputClassName
        )}
      />
    </div>
  );
}