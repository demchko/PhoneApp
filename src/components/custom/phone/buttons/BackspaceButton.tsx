import { usePhone } from "@/app/context/phone";
import { ActionButton } from "./ActionButton";
import {Delete} from 'lucide-react';

export function BackspaceButton(){
    const {dialerInput, setDialerInput} = usePhone();
    return (
        <ActionButton className="bg-black" onClick={() => setDialerInput(dialerInput.slice(0, -1))} >
            <Delete />
        </ActionButton>
    )
}