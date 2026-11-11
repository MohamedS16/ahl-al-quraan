import React, { useState } from "react"
import audioContext from "./audioContext"
import { audioType } from "../../types/audioPlayer.types"


const AudioWrapper : React.FC<{children : React.ReactNode}> = ({children}) => {

    const [audioDetails, setAudioDetails] = useState<audioType | null>(null)

    return (
    <audioContext.Provider value={{audioDetails,setAudioDetails}}>
        {children}
    </audioContext.Provider>
)}

export default AudioWrapper