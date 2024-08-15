import React,{ createContext, useState } from "react"

type tafseerContextType = {
    tafseerNumber : string,
    chooseTafseerNumber : (id : string)=>void
}

export const tafseerContext = createContext<tafseerContextType | null>(null)

const TafseerProvider : React.FC<{children : React.ReactNode}> = ({children}) => {

    const [tafseerNumber,setTafseerNumber] = useState('1')

    const chooseTafseerNumber = (id : string)=>{
        setTafseerNumber(id)
    }

  return (
    <tafseerContext.Provider value={{tafseerNumber,chooseTafseerNumber}}>
        {children}
    </tafseerContext.Provider>
  )
}

export default TafseerProvider