import { useEffect, useState } from "react";
import "./styles.css";
import {Nav} from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import {QuraaPage} from "./components/Quraa";
import {QuraaSwr} from "./components/QuraaSwr";
import {MoshafAllSwr} from "./components/MoshafAllSwr";
import {SurahPage} from "./components/MoshafSora";
import Reminder from "./components/reminder/Reminder";
import {Footer} from "./components/Footer";
import Tafseer from "./components/tafseer/Tafseer";
import { RadioPage } from "./components/Radio";
import AudioWrapper from "./components/audioPlayer/AudioWrapper";
import {AudioPlayer} from "./components/audioPlayer/AudioPlayer";
import Gallery from "./components/gallery/Gallery";
import Loading from "./components/loading/Loading";
import { ReciterContextLayout } from "./context/reciterContext/reciterContext";
import { ScrollToTOp } from "./components/ScrollToTop";

const App = () => {
  const [day, setDay] = useState(0);
  const [loaded,setLoaded] = useState(false);
  useEffect(() => {
    setDay(new Date().getDay());
    setLoaded(true);
  }, []);

  return (
    <>
    {loaded ? <>
      <Nav />
      <ScrollToTOp />
      <AudioWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ReciterContextLayout />}>
            <Route path="/quraa" element={<QuraaPage />} />
            <Route path="/quraa/:id" element={<QuraaSwr />} />
          </Route>
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/moshaf" element={<MoshafAllSwr />} />
          <Route path="/moshaf/:id" element={<SurahPage />}>
            <Route path=":aya" element={<Tafseer />} />
          </Route>
        </Routes>

        <AudioPlayer />
      </AudioWrapper>
      {day === 5 && <Reminder />}
      <Footer />
      </> : 
      <Loading />}
    </>

  );
};

export default App;