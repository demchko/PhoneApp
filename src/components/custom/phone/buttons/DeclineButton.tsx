import { PhoneOffIcon } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { ButtonProps } from "@/components/ui/button";

export function DeclineButton({...props}: ButtonProps){
    return (
        <ActionButton className="bg-black" {...props} >
            <PhoneOffIcon />
        </ActionButton>
    )
}