'use client'
import { PhoneProvider, PhoneState, usePhone } from "./context/phone";
import { DialButton } from "@/components/custom/phone/buttons/DialButton";
import { Header } from "@/components/custom/phone/Header";
import { SmallFooter } from "@/components/custom/phone/SmallFooter";
import { cn } from "@/lib/utils";
import { DialerInput } from "@/components/custom/dialer/DialerInput";
import { SmallPhone } from "@/components/custom/phone/SmallPhone";

export default function Home(){
  const {floatingSmallPhone, toggleFloatingSmallPhone, audioRef} = usePhone();
  return (
    <div className="relative w-full h-[100vh] grid transition-all duration-400 ease-in-out" >
            <div className={cn("", floatingSmallPhone ? "animate-fade-out grid-rows-[1fr] opacity-100" : "animate-fade-in grid-rows-[0fr] opacity-0")} >
              <audio ref={audioRef} autoPlay hidden />
              <SmallPhone />
            </div> 
           <DialButton className="absolute bottom-3 right-3" onClick={toggleFloatingSmallPhone} />
    </div>
  )
}