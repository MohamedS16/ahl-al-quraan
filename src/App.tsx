import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/nav/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Swr from './components/del/swr/Swr'
import Quraa from './components/Quraa/Quraa'
import QuraaSwr from './components/QuraaSwr/QuraaSwr'
import Listen from './components/listen/Listen'

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
        <Route path='/swr' element={<Swr />} />
      </Routes>
      {/* {
        day === 5 && <Reminder />
      } */}
      
    </>
  )
}

export default App


// import Reminder from './components/reminder/Reminder'
// import Receiters from './components/del/recieters/Receiters'
// import Telawa from './components/del/telawa/Telawa'

// <Route path='/reciters' element={<Receiters />} />
// <Route path='/reciters/:lang/:rewaya/:id' element={<Telawa />} />