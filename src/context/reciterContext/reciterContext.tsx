import {singleReciter} from '../../types/reciters.types';
import {createContext,useState, useContext} from 'react';
import {Outlet} from 'react-router-dom';

export const reciterContext = createContext<{value: singleReciter | null; setValue: React.Dispatch<React.SetStateAction<singleReciter | null>>
} | null>(null);

export const ReciterContextProvider = ({children}: {children: React.ReactNode})=>{

    const [value, setValue] = useState<singleReciter | null>(null);

    return (
        <reciterContext.Provider value={{value, setValue}}>
            {children}
        </reciterContext.Provider>
    );
}

export const useReciterContext = ()=>{
    const context = useContext(reciterContext);

    if (context === null) {
        throw new Error(
            "useReciterContext must be used within ReciterContextProvider"
        );
    }

    return context;
}

export const ReciterContextLayout = ()=>{
    return (
        <ReciterContextProvider>
            <Outlet />
        </ReciterContextProvider>
    )
}