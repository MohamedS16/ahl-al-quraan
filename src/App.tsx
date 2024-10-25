import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Quraa from "./components/Quraa/Quraa";
import QuraaSwr from "./components/QuraaSwr/QuraaSwr";
import MoshafAllSwr from "./components/moshafAllSwr/MoshafAllSwr";
import MoshafSora from "./components/moshafSora/MoshafSora";
import Reminder from "./components/reminder/Reminder";
import Footer from "./components/footer/Footer";
import Tafseer from "./components/tafseer/Tafseer";
import Radio from "./components/radio/Radio";
import AudioWrapper from "./components/audioPlayer/AudioWrapper";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";
import Gallery from "./components/gallery/Gallery";

const App = () => {
  const [day, setDay] = useState(0);
  useEffect(() => {
    setDay(new Date().getDay());
  }, []);

  return (
    <>
      <Nav />
      <AudioWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quraa" element={<Quraa />} />
          <Route path="/quraa/:id" element={<QuraaSwr />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/moshaf" element={<MoshafAllSwr />} />
          <Route path="/moshaf/:id" element={<MoshafSora />}>
            <Route path=":aya" element={<Tafseer />} />
          </Route>
        </Routes>
        <AudioPlayer />
      </AudioWrapper>
      {day === 5 && <Reminder />}
      <Footer />
    </>
  );
};

export default App;