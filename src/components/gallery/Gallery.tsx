import axios from "axios"
import { useEffect, useState } from "react"
import styles from './gallery.module.css'

const Gallery = () => {

  const [gallery,setGallery] = useState<any[]>([])
  const [number,setNumber] = useState(0)

    useEffect(()=>{
        axios.get('https://mp3quran.net/api/v3/tadabor').then(resp=>{
          const ar = []
          const arr : any[] = []
          for(let key in resp.data.tadabor){
            ar.push(resp.data.tadabor[key])
          }          
          ar.map(r=>arr.push(...r))
          setGallery(arr)
          console.log(gallery)
        }).catch(er=>console.log(er)) 
    },[])

  return (
    <section className={styles.galleryContainer}>
      <button onClick={()=>{number <= gallery?.length && setNumber( number + 1)}}>التالي</button>
        {

            <div className={styles.card} >
              <p>{gallery[number]?.reciter_name}</p>
              <video src={gallery[number]?.video_url} controls></video>
            </div>
        }
      <button onClick={()=>{number > 0 && setNumber(number - 1)}}>السابق</button>

    </section>
  )
}

export default Gallery