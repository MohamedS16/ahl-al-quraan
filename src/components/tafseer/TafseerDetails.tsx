import axios from "axios"
import React,{ useContext, useEffect, useState } from "react"
import { tafseerContext } from "./TafseerProvider"
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type tafseerType = [{
    "id": string,
    "name": string,
    "language": string,
    "book_name": string
}]

const TafseerDetails = () => {
    const [tafseer,setTafseer] = useState<tafseerType>()
    const tt = useContext(tafseerContext)
    const navigate = useNavigate()
    
    useEffect(()=>{
        axios.get('http://api.quran-tafseer.com/tafseer').then((resp)=>setTafseer(resp.data)).catch((er)=>console.log(er))
    },[])

return (
    <div>
        <FaWindowClose onClick={()=>navigate(-1)} />
        <select onChange={(e)=>tt?.chooseTafseerNumber(e.target.value)}>
            {
                tafseer?.map((t)=><option key={t.id} value={t.id}>{t.name}</option>)
            }
        </select>
    </div>
)}

export default React.memo(TafseerDetails)