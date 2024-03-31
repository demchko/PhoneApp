import { usePhone } from "@/app/context/phone"

export function Header(){
    const {phoneState, currentCall} = usePhone();
    return (
        <div className="text-white text-center" >
            <p className="text-xs first-letter:uppercase" >{phoneState.toLocaleLowerCase()}</p>
            <p className="text-3xl" >{currentCall?.remote_identity?.display_name || "Unknown"}</p>
            <p className="text-gray-300 text-xs pt-3" >{currentCall?.remote_identity?.uri?.user}</p>
        </div>
    )
}