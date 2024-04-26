import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

let initialState = {
    quotes: [],
    loading: false,
    error: false
}
const QuoteSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.quotes = action.payload.quotes
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false
            state.quotes = []
            state.error = true
        })

    }
})

export const fetchData = createAsyncThunk("quotes/fetch",
    async (obj, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://dummyjson.com/quotes?limit=100")
            // console.log("reponse of async thung", response.data.quotes)
            return response.data

        } catch (error) {
            // console.log("my error", error)
            return rejectWithValue(error)
        }
    })


export default QuoteSlice.reducer    