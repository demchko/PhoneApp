import { Phone, PhoneIcon } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { ButtonProps } from "@/components/ui/button";
import { PhoneState, usePhone } from "@/app/context/phone";

export function DialButton({...props}: ButtonProps){
    return (
        <ActionButton className="bg-green-500" {...props}  >
            <PhoneIcon />
        </ActionButton>
    )
}