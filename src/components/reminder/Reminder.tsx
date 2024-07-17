import { useState } from 'react';
import styles from './reminder.module.css'
import { FaWindowClose } from "react-icons/fa";


const Reminder = () => {
    const [reminderState, setReminderState] = useState(true)

  return (
    <div className={styles.reminder} style={reminderState ? {} : {display : 'none'}}>
        <div className={styles.title}>
            <FaWindowClose className={styles.icon} onClick={()=>setReminderState(false)} />
            <h3> لا تنسي قراءة سورة الكهف </h3>
        </div>
        <p>قال النبى عليه أفضل الصلاة والسلام : " اذا كانت ليلة الجمعة ويوم الجمعة فأكثروا من الصلاة علىَّ فإن صلاتكم معروضة علىَّ "
        <br />
        <br />
        وعن ابن عمر رضي الله عنهما قال : قال رسول الله صلى الله عليه وسلم : ” من قرأ سورة الكهف في يوم الجمعة سطع له نور من تحت قدمه إلى عنان السماء يضيء له يوم القيامة ، وغُفِر له ما بين الجمعتين "
        و قال ﷺ : من غسل يوم الجمعة واغتسل ، وبكر وابتكر، ومشى ولم يركب ، ودنا من الإمام واستمع،ولم يلغ كان له بكل خطوة عمل سنة أجر صيامها وقيامها .
        </p>
    </div>
  )
}

export default Reminder