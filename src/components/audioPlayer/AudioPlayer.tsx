import 'react-h5-audio-player/lib/styles.css';
import H5AudioPlayer from "react-h5-audio-player"
import styles from './audioPlayer.module.css'
import { useContext, useState} from "react"
import audioContext from "./audioContext"
import axios from "axios"
import fileDownload from 'js-file-download'
import { FaDownload } from "react-icons/fa";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";


const AudioPlayer = () => {

    const audio = useContext(audioContext)
    const [showPlayer, setShowPlayer] = useState(true)

    const handleDownload = (link : string,name : string)=>{
        axios.get(link,{
            responseType : 'blob'
        }).then(res=>fileDownload(res.data,name))
    }

  return (
    <>
      {
        audio?.audioDetails.name && 
        <div className={styles.audioPlayerComponent}  >
            <button className={styles.downHide}>{ showPlayer ? <FaAngleDoubleDown onClick={()=>setShowPlayer(false)} /> : <FaAngleDoubleUp onClick={()=>setShowPlayer(true)} />} </button>
            <div className={styles.audioPlayerComponent_audioDetails} style={showPlayer ? {} :{display : "none"} }>
                <p>{audio.audioDetails.name}</p>
                <H5AudioPlayer autoPlay={true} className={styles.audioPlayerComponent_player} layout="horizontal" src={`${audio?.audioDetails.url}`} />
                {audio.audioDetails.type == 'quraan' && <button className={styles.audioDownload} onClick={()=>handleDownload(audio.audioDetails.url,audio.audioDetails.name + '.mp3')}> <FaDownload /> تحميل </button>}
            </div>
        </div>
      }
        </>
  )
}

export default AudioPlayer