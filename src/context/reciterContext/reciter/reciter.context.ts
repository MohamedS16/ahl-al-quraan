import React, {createContext, useContext} from 'react';
import {singleReciter} from '../../../types/reciters.types';

export const reciterContext = createContext<{value: singleReciter | null; setValue: React.Dispatch<React.SetStateAction<singleReciter | null>>
} | null>(null);


export const useReciterContext = ()=>{
    const context = useContext(reciterContext);

    if (context === null) {
        throw new Error(
            "useReciterContext must be used within ReciterContextProvider"
        );
    }

    return context;
}
