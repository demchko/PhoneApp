import { MicIcon, MicOffIcon } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { useSyncExternalStore } from "react";
import { usePhone } from "@/app/context/phone";

export function MuteButton(){
    const {currentCall} = usePhone();
    const isMuted = useSyncExternalStore(
        (callback) => {
          currentCall?.addListener("muted", callback);
          currentCall?.addListener("unmuted", callback);
          return () => {
            currentCall?.removeListener("muted", callback);
            currentCall?.removeListener("unmuted", callback);
          };
        },
        () =>
          currentCall !== null ? (currentCall.isMuted().audio as boolean) : false,
      );
    
      const isOnHold = useSyncExternalStore(
        (callback) => {
          currentCall?.addListener("hold", callback);
          currentCall?.addListener("unhold", callback);
          return () => {
            currentCall?.removeListener("hold", callback);
            currentCall?.removeListener("unhold", callback);
          };
        },
        () => (currentCall !== null ? currentCall.isOnHold().local : false),
      );

    return (
        <ActionButton className="bg-black" onClick={() => currentCall?.[isMuted ? "unmute" : "mute"]()} >
              {isMuted ? <MicIcon /> : <MicOffIcon />}
        </ActionButton>
    )
}