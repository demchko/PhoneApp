import { PhoneState, usePhone } from "@/app/context/phone"
import { DialButton } from "./buttons/DialButton";
import { DeclineButton } from "./buttons/DeclineButton";
import { GripButton } from "./buttons/GripButton";

export function Footer(){
    const {phoneState, dialerOpen, switchPhoneState} = usePhone();
    return (
        <div>
            {
                phoneState === PhoneState.RINGING ?
                <div className="flex justify-between items-center" >
                    <DialButton onClick={() => switchPhoneState(PhoneState.TALKING)} />
                    <DeclineButton onClick={() => switchPhoneState(PhoneState.IDLE)} />
                </div>
                : <div className="w-full flex justify-center" >
                    {phoneState === PhoneState.IDLE && !dialerOpen && <GripButton />}
                    {phoneState === PhoneState.DIALING && <DeclineButton onClick={() => switchPhoneState(PhoneState.IDLE)} />}
                    {(phoneState === PhoneState.TALKING && !dialerOpen) && <DeclineButton onClick={() => switchPhoneState(PhoneState.IDLE)} />}
                </div>
            }
        </div>
    )
}