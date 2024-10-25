import { useContext } from 'react';
import styles from './radio.module.css'
import { FaPlay } from "react-icons/fa";
import audioContext from '../audioPlayer/audioContext';


type radioType = {
    radioss : {
        "id": number,
        "name": string,
        "url": string,
    }[],
    startingPosition : number
}

const RadioContent = (props : radioType) => {

  const audio = useContext(audioContext)

  return (
    <div className={styles.radios}>
        {
            props?.radioss?.map((r)=><div onClick={()=>audio?.setAudioDetails({name : r.name,type : 'radio',url:r.url})} key={r.id}><p>{r.name}</p> <FaPlay /></div>)
        }
    </div>
  )
}

export default RadioContent