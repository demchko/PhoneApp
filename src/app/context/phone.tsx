'use client';
import React, { createContext, useContext, useRef, useState } from "react";

export enum PhoneState{
    IDLE = "IDLE",
    DIALING = "DIALING",
    TALKING = "TALKING",
    RINGING = "RINGING",
}

interface StateType {
    phoneState: PhoneState;
    dialerOpen: boolean;
    dialerInput: string;
    setDialerInput: (input: string) => void;
    toggleDialer: () => void;
    switchPhoneState: (state: PhoneState) => void;
    dialerRef?: React.RefObject<HTMLDivElement>;
}

const PhoneContext = createContext<StateType>(null as any);

interface PhoneProviderProps {
    children: React.ReactNode;
}

export function PhoneProvider({children}: PhoneProviderProps){
    const [phoneState, setPhoneState] = useState(PhoneState.IDLE);
    const [dialerOpen, setDialerOpen] = useState(false);
    const [dialerInput, setDialerInput] = useState("");
    const dialerRef = useRef(null);

    const toggleDialer = () => setDialerOpen(!dialerOpen);
    
    const switchPhoneState = (state: PhoneState) => {
        setPhoneState(state);
        if(phoneState === PhoneState.DIALING){
            setDialerOpen(false);
        }
    }

    const value: StateType = {
        phoneState,
        switchPhoneState,
        dialerOpen, 
        toggleDialer,
        dialerInput,
        setDialerInput,
        dialerRef,
    }

    return (
        <PhoneContext.Provider value={value} >{children}</PhoneContext.Provider>
    )
}

export const usePhone = () => useContext(PhoneContext);