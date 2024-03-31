'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import JsSIP from "jssip";
import { IncomingRTCSessionEvent, UAConfiguration, UnRegisteredEvent } from "jssip/lib/UA";
import { RTCSession } from "jssip/lib/RTCSession";
import skype from "../../ringtones/skype.mp3";

// jssip
const WEBRTC_SERVER_URL = "wss://sip2.mvoice.co.il";
const SIP_URI = "sip:6099611641@sip2.mvoice.co.il";
const SIP_PASSWORD = "d8k03L2R1K45ZNJ9";



export enum PhoneState{
    IDLE = "IDLE",
    DIALING = "DIALING",
    TALKING = "TALKING",
    RINGING = "RINGING",
}

interface StateType {
    floatingButton?: boolean;
    toggleFloatingButton?: () => void;
    floatingSmallPhone?: boolean;
    toggleFloatingSmallPhone?: () => void;
    phoneState: PhoneState;
    dialerOpen: boolean;
    dialerInput: string;
    audioRef: React.RefObject<HTMLAudioElement>;
    setDialerInput: (input: string) => void;
    toggleDialer: () => void;
    switchPhoneState: (state: PhoneState) => void;
    dialerRef?: React.RefObject<HTMLDivElement>;
    // jssip
    userAgent: JsSIP.UA;
    currentCall: RTCSession | null;
    addCall: (call: RTCSession) => void;
    removeCall: () => void;
}

const PhoneContext = createContext<StateType>(null as any);

interface PhoneProviderProps {
    children: React.ReactNode;
}

export function PhoneProvider({children}: PhoneProviderProps){

    const [socket] = useState(new JsSIP.WebSocketInterface(WEBRTC_SERVER_URL));

    const configuration: UAConfiguration = {
      sockets: [socket],
      uri: SIP_URI,
      password: SIP_PASSWORD,
    };
  
    const [userAgent] = useState(new JsSIP.UA(configuration));
  
    const [currentCall, setCurrentCall] = useState<RTCSession | null>(null);

    const addCall = (call: RTCSession) => setCurrentCall(call);
    const removeCall = () => setCurrentCall(null);

    const audioRef = useRef<HTMLAudioElement>(null);

    // states local
    const [floatingButton, setFloatingButton] = useState(true);
    const [floatingSmallPhone, setFloatingSmallPhone] = useState(false);
    const [phoneState, setPhoneState] = useState(PhoneState.IDLE);
    const [dialerOpen, setDialerOpen] = useState(false);
    const [dialerInput, setDialerInput] = useState("");
    const dialerRef = useRef(null);

    const toggleDialer = () => setDialerOpen(!dialerOpen);
    const toggleFloatingButton = () => setFloatingButton(!floatingButton);
    const toggleFloatingSmallPhone = () => setFloatingSmallPhone(!floatingSmallPhone);
    
    const switchPhoneState = (state: PhoneState) => {
        setPhoneState(state);
        if(phoneState === PhoneState.DIALING){
            setDialerOpen(false);
        }
    }

    useEffect(() => {
        //incoming call
        userAgent.on(
            "newRTCSession",
            ({ originator, session }: IncomingRTCSessionEvent) => {
              // handle incoming call
              if (originator !== "remote") {
                return;
              }
      
              addCall(session);
      
              session.on("progress", () => {
                console.log("call is in progress");
                switchPhoneState(PhoneState.RINGING);
                setFloatingSmallPhone(true);
                if (audioRef.current) {
                  audioRef.current.src = skype;
                  audioRef.current.play();
                  audioRef.current.loop = true;
                }
              });
      
              session.on("failed", (e) => {
                audioRef.current?.pause();
                removeCall();
                switchPhoneState(PhoneState.IDLE);
              });
      
              session.on("ended", (e) => {
                audioRef.current?.pause();
                removeCall();
                switchPhoneState(PhoneState.IDLE);
              });
              session.on("accepted", () => switchPhoneState(PhoneState.TALKING)),
              session.on("peerconnection", ({ peerconnection }) => {
                peerconnection.ontrack = (e) => {
                  if (audioRef.current) {
                    const stream = e.streams[0];
                    audioRef.current.srcObject = stream;
                  }
                };
              });
            },
          );

        userAgent.start();

    // 2. Provide cleanup function (run when component unmounts)
    return () => {
      userAgent.stop();
      userAgent.removeAllListeners();
    };
  }, [userAgent]);

    const value: StateType = {
        phoneState,
        switchPhoneState,
        dialerOpen, 
        toggleDialer,
        dialerInput,
        setDialerInput,
        dialerRef,
        userAgent,
        currentCall,
        addCall,
        removeCall,
        floatingButton,
        floatingSmallPhone,
        toggleFloatingButton,
        toggleFloatingSmallPhone,
        audioRef
    }

    return (
        <PhoneContext.Provider value={value} >{children}</PhoneContext.Provider>
    )
}

export const usePhone = () => useContext(PhoneContext);