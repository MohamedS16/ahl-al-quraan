import { useSyncExternalStore } from "react";
import "./styles.css";
import {Nav} from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import {QuraaPage} from "./pages/Quraa";
import {QuraaSwr} from "./pages/QuraaSwr";
import {MoshafAllSwr} from "./pages/MoshafAllSwr";
import {SurahPage} from "./pages/MoshafSora";
import Reminder from "./components/reminder/Reminder";
import {Footer} from "./components/Footer";
import { RadioPage } from "./pages/Radio";
import AudioWrapper from "./components/audioPlayer/AudioWrapper";
import {AudioPlayer} from "./components/audioPlayer/AudioPlayer";
import { Gallery } from "./pages/Gallery";
import Loading from "./components/loading/Loading";
import { ReciterContextLayout } from "./context/reciterContext/reciter/reciterContext.hooks";
import { ScrollToTOp } from "./components/ScrollToTop";

const emptySubscribe = () => () => {};

function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const App = () => {
  const day = new Date().getDay();
  const loaded = useHasMounted();

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
          <Route path="/moshaf/:id" element={<SurahPage />} />
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