import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ActionButton({className, ...props}: ButtonProps){
    return (
        <Button className={cn("w-16 h-16 rounded-full", className)} {...props} /> 
    )
}