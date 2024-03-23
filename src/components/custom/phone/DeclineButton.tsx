import { PhoneOffIcon } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { ButtonProps } from "@/components/ui/button";

export function DeclineButton({...props}: ButtonProps){
    return (
        <ActionButton className="bg-gray-500" {...props} >
            <PhoneOffIcon />
        </ActionButton>
    )
}