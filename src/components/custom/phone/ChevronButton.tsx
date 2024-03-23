import { ButtonProps } from "@/components/ui/button";
import { ActionButton } from "./ActionButton";
import { ChevronDown } from "lucide-react";
import { usePhone } from "@/app/context/phone";

export function ChevronButton({...props}: ButtonProps){
    const {toggleDialer} = usePhone();
    return (
        <ActionButton className="bg-black" onClick={toggleDialer} >
            <ChevronDown />
        </ActionButton>
    )
}