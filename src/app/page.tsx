import { DialerInput } from "@/components/custom/dialer/DialerInput";
import { DialerKeyButton } from "@/components/custom/dialer/DialerKeyButton";
import { DialerKeypad } from "@/components/custom/dialer/DialerKeypad";
import { ActionButton } from "@/components/custom/phone/buttons/ActionButton";
import { PhoneScreen } from "@/components/custom/phone/PhoneScreen";
import { PhoneProvider } from "./context/phone";

export default function Home(){
  return (
    <div className="flex justify-center w-full h-[100vh] items-center" >
      <PhoneProvider>
        <PhoneScreen />
      </PhoneProvider>
    </div>
  )
}