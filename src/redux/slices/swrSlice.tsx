import { createSlice } from "@reduxjs/toolkit"

// type rec = {
//     recData : {
//         id : number,
//         letter : string,
//         name : string,
//         moshaf : [{
//           name : string
//           server : string,
//           surah_list : []
//         }]
//       }
// }

const initialState = {
    recData : {}
}

const swrSlice = createSlice({
    name : 'swr',
    initialState,
    reducers : {
        addSwr : (state,action)=>{
            state.recData = action.payload
        }
    }
})

export default swrSlice