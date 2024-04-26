import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    agiya: false,
    CountWords: [],
    error: false
}
const max = createSlice({
    name: "CountWords",
    initialState,
    reducers: {
       maxCountWords : (state , action)=>{
        state.agiya = true
        let { quotes , value } = action.payload
        if(!quotes || !value){
            state.error = true
            state.CountWords = []
            state.agiya = false
            return
        }
        let quote = quotes.map((obj)=>obj.quote.slice(0,value))
        state.CountWords = quote
       },
       minCountWords : (state , action)=>{
        state.agiya = true
        let { quotes , value } = action.payload
        if(!quotes || !value){
            state.error = true
            state.CountWords = []
            state.agiya = false
            return
        }
        let quote = quotes.map((obj)=>obj.quote.slice(value,50))
        state.CountWords = quote
       }
    }

})

export const { maxCountWords , minCountWords } = max.actions
export default max.reducer
