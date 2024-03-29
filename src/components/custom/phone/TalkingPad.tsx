import { MicOff, Pause, Volume2 } from "lucide-react";
import { ActionButton } from "./buttons/ActionButton";
import { GripButton } from "./buttons/GripButton";

export function TalkingPad(){
    return (
        <div className="grid grid-cols-3 justify-items-center" >
            <ActionButton><MicOff /></ActionButton>
            <GripButton />
            <ActionButton><Pause /></ActionButton>
            <ActionButton><Volume2 /></ActionButton>
        </div>
    )
}