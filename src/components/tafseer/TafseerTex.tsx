import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { tafseerContext } from "./TafseerProvider"
import { useParams } from "react-router-dom"


type tafseerTextType = {
    // ayah_number: 139,
    // ayah_url: "/quran/2/139/"
    // tafseer_id: 7
    tafseer_name: string,
    text: string 
}

const TafseerTex = () => {

    let tafseer = useContext(tafseerContext)
    const params = useParams()
    const [tafseerText,setTafseerText] = useState<tafseerTextType>()

    useEffect(()=>{
        axios.get(`http://api.quran-tafseer.com/tafseer/${tafseer?.tafseerNumber}/${params.id}/${params.aya}`).then(res=>setTafseerText(res.data)).catch(er=>console.log(er))
    },[tafseer?.tafseerNumber,params])


  return (
    <div>
        {
            !tafseerText ? <p>يتم التحميل ...</p> : <p>{tafseerText?.text}</p>
        }
        
    </div>
  )
}

export default TafseerTex