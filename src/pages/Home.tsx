import {DailyAya} from "../components/DailyAya"
import { Features } from "../components/features"
import {Landing} from "../components/Landing"
import PrayerTimes from "../components/PrayerTimes"

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