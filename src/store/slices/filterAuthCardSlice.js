import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    agiya: false,
    filteredQuotes: [],
    error: false
}
const filter = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterAuthCards: (state, action) => {
            state.agiya = true
            let authorNAme = action.payload.authorName
            let quotes = action.payload.quotes
            if (action.payload.authorName !== "All") {
                state.filteredQuotes = quotes.filter(obj => obj.author === authorNAme)
            }else{
                state.filteredQuotes = quotes
            }
        }
    }

})

export const { filterAuthCards } = filter.actions
export default filter.reducer
