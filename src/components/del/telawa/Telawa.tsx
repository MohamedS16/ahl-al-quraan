import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

type rec = {
      id : number,
      letter : string,
      name : string,
      moshaf : {
        name : string
        server : string,
        surah_list : string
      }
}

type swrType = [{
  id: number,
  name:string,
  start_page: number,
  end_page: number,
  makkia: number,
  type: number,
  link : string
}]


const Telawa = () => {

    const [telawat,setTelawat] = useState<rec>({} as rec)
    const [swrName, setSwrName] = useState<swrType>([{}] as swrType)
    const [swrAudios, setSwrAudios] = useState<swrType>([{}] as swrType)
    const [noRead,setNoRead] = useState('')
    const [loading,setloading] = useState(true)
    const params = useParams()

    const matchSwr = (swrList : string[], allSwr : swrType)=>{
      const swrArr : any = []
      // console.log(swrList)
      for(let x = 0; x < swrList?.length; x++){
        allSwr.filter((sora)=>sora.id === +swrList[x] && swrArr.push(sora))
      }
      setSwrAudios(swrArr)
      // console.log(swrAudios)
    }

    useEffect(()=>{
      axios.get(`https://www.mp3quran.net/api/v3/reciters?language=${params.lang}&reciter=${params.id}`)
      .then(res=>{

        res.data.reciters?.length === 1 ? 
        res.data.reciters[0]?.moshaf.find((r : any)=>r.name === params.rewaya && setTelawat({...res.data.reciters[0],moshaf : r}))
        : params.lang === 'ar' ? setNoRead('لا يوجد قارئ , برجاء اختيار من قائمة القراء') : setNoRead('No Reciter, please choose another');
      }).then(()=>{setloading(false)})
      .catch(er=>console.log(er))  

      axios.get(`https://mp3quran.net/api/v3/suwar?language=${params.lang}`)
      .then(res=>setSwrName(res.data.suwar))
      .catch(er=>console.log(er))

      const swrnums : string[] = telawat?.moshaf?.surah_list?.split(',')
      console.log(telawat) 
      matchSwr(swrnums,swrName)

      },[])

  return (
    <div>
      { 
        loading ? 
        <div>
          <p>
          {params.lang === 'ar' ? 'يتم تحميل السور' : 'Loading...' }
          </p>
        </div> : 

          noRead ? <p>{noRead}</p> :

          <>
        <h1> {telawat.name} </h1>
        {/* <p> {telawat.moshaf.name} </p> */}
        <div>
          {
            swrAudios.map((s)=>(
              
                <Link to={`${s.id}`} key={s.id} > {s.name} </Link>
              ))
          }
        </div>
        </>
        

      }
    </div>
  )
}

export default Telawa