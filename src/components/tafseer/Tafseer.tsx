
import styles from './tafseer.module.css'
import TafseerDetails from "./TafseerDetails";
import TafseerProvider from "./TafseerProvider";
import TafseerTex from "./TafseerTex";


const Tafseer = () => {

    return (
    <section className={styles.tafseer}>
        <div className={styles.tafseer_content}>
            <TafseerProvider>
                <TafseerDetails />
                <TafseerTex />
            </TafseerProvider>
        </div>
    </section>
)}

export default Tafseer