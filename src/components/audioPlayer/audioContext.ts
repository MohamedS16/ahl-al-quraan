import { createContext, useContext } from "react";
import { audioContextData } from "../../types/audioPlayer.types";

const audioContext = createContext<audioContextData | null>(null)

export const useAudio = () => {
    const context = useContext(audioContext);

    if (!context) {
        throw new Error("useAudio must be used within AudioProvider");
    }

    return context;
};

export default audioContext
