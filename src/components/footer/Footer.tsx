import { Link } from 'react-router-dom'
import styles from './footer.module.css'
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn,FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_top}>
                <div className={styles.footer_top_right}>
                    <h3> عن الموقع </h3>
                    <ul>
                        <li><Link target='_blank' to='https://www.mp3quran.net/'> التلاوات و المصحف عن طريق  : MP3 Quraan </Link></li>
                        <li><Link target='_blank' to='https://aladhan.com/'> مواقيت الصلاة عن طريق  : الاذان </Link></li>
                        <li><Link target='_blank' to='https://www.freepik.com/'> الصور المرئية عن طريق  : freepik</Link></li>
                        <li><Link target='_blank' to='http://api.quran-tafseer.com/'> تفسير الايات عن طريق  : Quran Tafseer</Link></li>
                    </ul>
                </div>
                <div className={styles.footer_top_left}>
                    <h3>تواصل معي</h3>
                    <Link to='https://www.linkedin.com/in/mohameds162' target='_blank'><FaLinkedinIn /></Link>
                    <Link to='mailto:mohamedsameh162000@gmail.com' target='_blank'><MdEmail /></Link>
                    <Link to='https://github.com/MohamedS16' target='_blank'><FaGithub /></Link>
                    
                    
                </div>
            </div>
            <div className={styles.footer_line}></div>
            <div className={styles.footer_bottom}>
                <p> تم تطوير الموقع عن طريق <Link to='https://www.linkedin.com/in/mohameds162' target='_blank'>محمد سامح</Link> </p>
            </div>
        </footer>
    )
}

export default Footer