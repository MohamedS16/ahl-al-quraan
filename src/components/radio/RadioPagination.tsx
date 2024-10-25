import changeNumbersToArabic from "../../utils/changeNumbersToArabic"
import styles from './radio.module.css'

type radiosPaginationProps = {
    radiosLength : number,
    currentPage : number,
    setcurrentPage : (n:number)=>void
}

const RadioPagination = (props:radiosPaginationProps) => {

  return (
    <div className={styles.radio_pagination}>
        {
            Array.from({length : Math.ceil(props.radiosLength / 30)},(_,idx)=><p key={idx} style={props.currentPage === idx+1 ? {backgroundColor : 'dodgerblue',color: 'white'} : {}} onClick={()=>props.setcurrentPage(idx+1)}>{changeNumbersToArabic(`${idx+1}`)}</p>)
        }
    </div>
  )
}

export default RadioPagination