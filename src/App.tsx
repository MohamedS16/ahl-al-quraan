import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/nav/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Quraa from './components/Quraa/Quraa'
import QuraaSwr from './components/QuraaSwr/QuraaSwr'
import Listen from './components/listen/Listen'
import MoshafAllSwr from './components/moshafAllSwr/MoshafAllSwr'
import MoshafSora from './components/moshafSora/MoshafSora'
import Reminder from './components/reminder/Reminder'
import Footer from './components/footer/Footer'
import Tafseer from './components/tafseer/Tafseer'
import Radio from './components/radio/Radio'

const App = ()=>{
  const [day,setDay] = useState(0)
  useEffect(()=>{
    setDay(new Date().getDay())
  },[])

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quraa' element={<Quraa />} />
        <Route path='/quraa/:id' element={<QuraaSwr />}> 
          <Route path=':idd' element={<Listen />} />
        </Route>
        <Route path='/moshaf' element={<MoshafAllSwr />} />
        <Route path='/moshaf/:id' element={<MoshafSora />}>
          <Route path=':aya' element={<Tafseer />} />
        </Route>
        <Route path='/radio' element={<Radio />} />
      </Routes>
      {
        day === 5 && <Reminder />
      }

      <Footer />
      
    </>
  )
}

export default App


// import Reminder from './components/reminder/Reminder'
// import Receiters from './components/del/recieters/Receiters'
// import Telawa from './components/del/telawa/Telawa'

// <Route path='/reciters' element={<Receiters />} />
// <Route path='/reciters/:lang/:rewaya/:id' element={<Telawa />} />