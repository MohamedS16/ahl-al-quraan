import styles from './landing.module.css'

const Landing = () => {
  return (
    <section className={styles.landingContainer}>
        <div className={styles.textContent}>
            <h1> وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا </h1>
            <button> تصفح الموقع </button>
        </div>
    </section>
  )
}

export default Landing