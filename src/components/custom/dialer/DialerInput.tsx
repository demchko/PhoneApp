import { Input } from "@/components/ui/input";
import { ActionButton } from "../phone/buttons/ActionButton";
import { BackspaceButton } from "../phone/buttons/BackspaceButton";
import { ChevronButton } from "../phone/buttons/ChevronButton";
import { usePhone } from "@/app/context/phone";

export function DialerInput(){
    const {dialerInput, setDialerInput, dialerRef, dialerOpen} = usePhone();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filtered = e.target.value.replace(/[^0-9*+#]/g, "");
        setDialerInput(filtered);
    }


    return (
        <div className="flex justify-between items-center" >
            <Input value={dialerInput} onChange={handleChange} className="text-white text-xl border-none bg-transparent text-center focus:outline-none" placeholder="Enter phone" />
            <BackspaceButton />
        </div>
    )
}