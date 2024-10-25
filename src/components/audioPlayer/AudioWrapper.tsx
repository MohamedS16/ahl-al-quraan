import React, { useState } from "react"
import audioContext from "./audioContext"

type audioType = {
    type : string,
    name : string,
    url : string
} 

const AudioWrapper : React.FC<{children : React.ReactNode}> = ({children}) => {

    const [audioDetails, setAudioDetails] = useState<audioType>({type : '',name : '',url : ''})

    return (
    <audioContext.Provider value={{audioDetails,setAudioDetails}}>
        {children}
    </audioContext.Provider>
  )
}

export default AudioWrapper