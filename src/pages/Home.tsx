import {DailyAya} from "../components/dailyAya/DailyAya"
import { Features } from "../components/features"
import {Landing} from "../components/landing/Landing"
import PrayerTimes from "../components/prayerTimes/PrayerTimes"

const Home = () => {
  return (
    <>
      <Landing />
      <DailyAya />
      <Features />   
      <PrayerTimes />
    </>
  )
}

export default Home