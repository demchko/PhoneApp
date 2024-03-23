import { DialerKeyButton } from "./DialerKeyButton";
import type { KeyType } from "./DialerKeyButton";

const KeyNumbers: KeyType[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];


export function DialerKeypad(){
    return (
        <div className="grid grid-cols-3 gap-4 justify-items-center" >
            {
                KeyNumbers.map((item: KeyType) => (
                    <DialerKeyButton keyNumber={item} />
                ))
            }
        </div>
    )
}