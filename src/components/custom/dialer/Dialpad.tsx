import { PhoneState, usePhone } from "@/app/context/phone";
import { DialButton } from "../phone/DialButton";
import { DialerInput } from "./DialerInput";
import { DialerKeypad } from "./DialerKeypad";

export function Dialpad(){
    const {switchPhoneState} = usePhone();
    return (
        <div>
            <DialerInput />
            <DialerKeypad />
            <div className="w-full flex justify-center pt-3" >
                <DialButton onClick={() => switchPhoneState(PhoneState.DIALING)} />
            </div>
        </div>
    )
}