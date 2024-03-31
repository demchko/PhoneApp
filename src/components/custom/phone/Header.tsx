import { usePhone } from "@/app/context/phone"

export function Header(){
    const {phoneState, dialerInput} = usePhone();
    return (
        <div className="text-white text-center" >
            <p className="text-xs" >{phoneState.toLocaleLowerCase()}</p>
            <p className="text-3xl" >Darrel Steward</p>
            <p className="text-gray-300 text-xs pt-3" >{dialerInput}</p>
        </div>
    )
}