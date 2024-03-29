import { Grip } from "lucide-react";
import { ActionButton } from "./ActionButton";
import type { ButtonProps } from "@/components/ui/button";
import { usePhone } from "@/app/context/phone";

export function GripButton(){
    const {toggleDialer} = usePhone();
    return (
        <ActionButton className="bg-black" onClick={toggleDialer} >
            <Grip />
        </ActionButton>
    )
}