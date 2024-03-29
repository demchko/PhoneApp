import { ButtonProps } from "@/components/ui/button";
import { ActionButton } from "./ActionButton";
import { ChevronDown } from "lucide-react";
import { usePhone } from "@/app/context/phone";

export function ChevronButton({...props}: ButtonProps){
    const {toggleDialer, dialerRef, dialerOpen} = usePhone();
    const click = () => {
        toggleDialer();
        // dialerRef?.current.animate({
        //     height: dialerOpen ? '100px' : '300px',
        //   });
    }
    return (
        <ActionButton className="bg-black" onClick={click} >
            <ChevronDown />
        </ActionButton>
    )
}