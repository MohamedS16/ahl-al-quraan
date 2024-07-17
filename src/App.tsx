import { useEffect, useState } from 'react'
import './App.css'
import DailyAya from './components/dailyAya/DailyAya'
import Landing from './components/landing/Landing'
import Nav from './components/nav/Nav'
import Reminder from './components/reminder/Reminder'
import Receiters from './components/recieters/Receiters'

const App = ()=>{
  const [day,setDay] = useState(0)
  useEffect(()=>{
    setDay(new Date().getDay())
  },[])

  return (
    <>
      <Nav />
      <Landing />
      <DailyAya />
      {
        day === 5 && <Reminder />
      }
      <Receiters />
    </>
  )
}

export default App
