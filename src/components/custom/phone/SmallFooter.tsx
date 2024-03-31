import { PhoneState, usePhone } from "@/app/context/phone";
import { DialButton } from "./buttons/DialButton";
import { DeclineButton } from "./buttons/DeclineButton";
import { MuteButton } from "./buttons/Mute";
import { GripButton } from "./buttons/GripButton";
import { RTCSessionEventMap } from "jssip/lib/RTCSession";
import { CallOptions } from "jssip/lib/UA";

export function SmallFooter(){
    const {switchPhoneState, removeCall, addCall, dialerInput, userAgent, currentCall, phoneState} = usePhone();

   const eventHandlers: Partial<RTCSessionEventMap> = {
    progress: () => switchPhoneState(PhoneState.DIALING),
    failed: (e) => {
      removeCall();
      switchPhoneState(PhoneState.IDLE);
    },
    ended: (e) => {
      removeCall();
      switchPhoneState(PhoneState.IDLE);
    },
    accepted: () => {
      console.log("Call is talking");
      switchPhoneState(PhoneState.TALKING);
    },
  };

  const options: CallOptions = {
    eventHandlers,
    mediaConstraints: { audio: true, video: false },
  };

    return (
        <div>
            {
                phoneState === PhoneState.TALKING &&
                    <div className="flex justify-between" >
                        <GripButton />
                        <MuteButton />
                        <DeclineButton onClick={() => currentCall?.terminate()} />
                    </div>
            }
            {
                phoneState === PhoneState.IDLE &&
                    <div className="flex justify-between" >
                        <GripButton />
                        <DialButton onClick={() => {
                            if(dialerInput.length){
                                const call = userAgent.call(dialerInput, options);
                                addCall(call);
                            }
                        }} />
                    </div>
            }
            {
                phoneState === PhoneState.DIALING &&
                    <div className="flex justify-center" >
                        <DeclineButton onClick={() => currentCall?.terminate()} />
                    </div>
            }
            {
                phoneState === PhoneState.RINGING &&
                    <div className="flex justify-between" >
                        <DialButton onClick={() => currentCall?.answer()}  />
                        <DeclineButton onClick={() => currentCall?.terminate()} />
                    </div>
            }
        </div>
    )
}