'use client';
import { PhoneState, usePhone } from "@/app/context/phone";
import { DialerKeypad } from "../dialer/DialerKeypad";
import { Dialpad } from "../dialer/Dialpad";
import { Header } from "./Header";
import { PersonHistory } from "./PersonHistory";
import { Footer } from "./Footer";
import { ActionButton } from "./ActionButton";
import { Phone } from "lucide-react";
import { TalkingPad } from "./TalkingPad";

export function PhoneScreen(){

    const {phoneState, dialerOpen, switchPhoneState} = usePhone();
    return (
       <div>
         <div className="w-[300px] h-[650px] bg-black p-4 flex flex-col justify-between rounded-3xl" >
             { phoneState === PhoneState.IDLE && <div className="overflow-auto scrollbar-thin">
                {Array(4).fill(0).map((_, i) => <PersonHistory key={i} />)}
            </div> }
            { (phoneState === PhoneState.RINGING || phoneState === PhoneState.DIALING || phoneState === PhoneState.TALKING) && <Header /> }
            { ((phoneState === PhoneState.IDLE && dialerOpen) || phoneState === PhoneState.TALKING && dialerOpen) && <Dialpad /> }
            { (phoneState === PhoneState.TALKING && !dialerOpen) && <TalkingPad /> }
            <Footer /> 
        </div>
        {/* Buttons */}
        <div className="w-full flex justify-center pt-8" >
        {phoneState === PhoneState.DIALING && <div>
                <ActionButton className="bg-green-500" onClick={() => switchPhoneState(PhoneState.TALKING)} ><Phone /></ActionButton>
                <p>Pick up</p>
            </div>}
        {phoneState === PhoneState.IDLE && <div>
            <ActionButton className="bg-green-500" onClick={() => switchPhoneState(PhoneState.RINGING)} ><Phone /></ActionButton>
            <p>Call</p>
        </div>}
        </div>
       </div>
    )
}