import axios from "axios"
import { useEffect, useState } from "react"
import Content from "./Content"
import styles from './receiters.module.css'
import { CiSearch } from "react-icons/ci";

type rewaya = [{
  id : number,
  name : string
}]

type langg = [{
  id : number,
  native : string,
  locale : string
}]

type choices = {
  rewaya : string,
  lang : string
}


const Receiters = () => {

  const [rewayat,setrewayat] = useState<rewaya>([{id: 1,name:"حفص عن عاصم"}])
  const [lang,setlang] = useState<langg>([{id: 1, native: 'العربية',locale: 'ar'}])
  const [choices,setchoices] = useState<choices>({rewaya: '1', lang: 'ar'})

    useEffect(()=>{

        axios.get('https://mp3quran.net/api/v3/riwayat?language=ar')
        .then(res=>setrewayat(res.data.riwayat))
        .catch(er=>console.log(er))
        
        axios.get('https://mp3quran.net/api/v3/languages')
        .then(res=>setlang(res.data.language))
        .catch(er=>console.log(er))

    },[])

  return (
    <section className={styles.recitersContainer}>

        <aside className={styles.sidebar}>

          <div className={styles.search}>
            <input type="text" placeholder="ابحث عن قارئ " />
            <CiSearch />
          </div>

          <div className={styles.language}>
            <p> اللغة </p>
            <select onChange={(e)=>{setchoices({...choices,lang : e.target.value}) ; console.log(choices)}}>
              {
                lang.map(la=><option key={la.id} value={la.locale}>{la.native}</option>)
              }
            </select>
          </div>

          <div className={styles.rewaya}>
            <p> رواية </p>
            <select onChange={(e)=>setchoices({...choices,rewaya : e.target.value})}>
              {
                rewayat?.map((r)=><option key={r.id} value={r.id}>{r.name}</option>)
              }
            </select>
          </div>

        </aside>

        <Content choices={choices} />

    </section>
  )
}

export default Receiters