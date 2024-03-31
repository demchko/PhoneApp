import { PhoneState, usePhone } from "@/app/context/phone"
import { cn } from "@/lib/utils";
import { DialerInput } from "../dialer/DialerInput";
import { SmallFooter } from "./SmallFooter";
import { Header } from "./Header";
import { DialerKeypad } from "../dialer/DialerKeypad";

export function SmallPhone(){
    const {phoneState, dialerOpen} = usePhone();
    return (
        <div className="bg-black w-[300px] border border-gray-300 absolute bottom-[90px] right-3 p-4 rounded-lg text-black" >
              {phoneState !== PhoneState.IDLE && <Header />}
              <div className={cn("grid transition-all duration-200 ease-in-out",
                      dialerOpen ? "animate-slide-up grid-rows-[1fr] opacity-100" : "animate-slide-down grid-rows-[0fr] opacity-0")} >
                        <div className="overflow-hidden" >
                          {phoneState === PhoneState.IDLE && <DialerInput />}
                          {phoneState === PhoneState.TALKING && <DialerKeypad />}
                        </div>
                  </div>
              <SmallFooter />
          </div>
    )
}