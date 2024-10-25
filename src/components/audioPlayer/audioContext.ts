import { createContext } from "react";

type audioType = {
    type : string,
    name : string,
    url : string
} 

type audioContextData = {
    audioDetails: audioType,
    setAudioDetails : (n : audioType)=>void
}

const audioContext = createContext<audioContextData | null>(null)

export default audioContext
