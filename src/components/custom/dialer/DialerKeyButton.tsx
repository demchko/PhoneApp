import { usePhone } from "@/app/context/phone";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export type KeyType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "*" | "0" | "#";

const KeyLetters: Record<KeyType, string> = {
    "1": "",
    "2": "ABC",
    "3": "DEF",
    "4": "GHI",
    "5": "JKL",
    "6": "MNO",
    "7": "PQRS",
    "8": "TUV",
    "9": "WXYZ",
    "*": "",
    "0": "+",
    "#": ""
}

interface DialerKeyButtonProps{
    keyNumber: KeyType;
}


export function DialerKeyButton({keyNumber}: DialerKeyButtonProps){
    const {dialerInput, setDialerInput} = usePhone();
    const letters = KeyLetters[keyNumber];



    return (
        <Button onClick={() => setDialerInput(dialerInput + keyNumber)} className={cn("w-16 h-16 rounded-full flex flex-col text-xl bg-gray-500 text-white", letters ? "justify-end" : "justify-center")} variant="ghost" >
            {keyNumber}
            {letters && <p className="text-xs" >{letters}</p>}
        </Button>
    )
}