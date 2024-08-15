import styles from './radio.module.css'
import { FaPlay } from "react-icons/fa";


type radioType = {
    radioss : {
        "id": number,
        "name": string,
        "url": string,
    }[],
    startingPosition : number
}

const RadioContent = (props : radioType) => {
  return (
    <div className={styles.radios}>
        {
            props?.radioss?.map((r)=><div key={r.id}><p>{r.name}</p> <FaPlay /></div>)
        }
    </div>
  )
}

export default RadioContent