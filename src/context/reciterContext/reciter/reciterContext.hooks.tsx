import {singleReciter} from '../../../types/reciters.types';
import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import React from 'react';
import {reciterContext} from './reciter.context';

export const ReciterContextProvider = ({children}: {children: React.ReactNode})=>{

    const [value, setValue] = useState<singleReciter | null>(null);

    return (
        <reciterContext.Provider value={{value, setValue}}>
            {children}
        </reciterContext.Provider>
    );
}

export const ReciterContextLayout = ()=>{
    return (
        <ReciterContextProvider>
            <Outlet />
        </ReciterContextProvider>
    )
}