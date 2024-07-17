import axios from "axios"
import { useEffect } from "react"

const Receiters = () => {

    useEffect(()=>{
        axios.get('https://mp3quran.net/api/v3/reciters?rewaya=1')
        .then(res=>console.log(res.data.reciters))
        .catch(er=>console.log(er))

    },[])

  return (
    <section>
        
    </section>
  )
}

export default Receiters