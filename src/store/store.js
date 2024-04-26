import { configureStore } from "@reduxjs/toolkit";
import QuoteSlice from "./slices/QuoteSlice";
import filterAuthCardSlice from "./slices/filterAuthCardSlice";
import CountSlice from "./slices/CountSlice";




const store = configureStore({
    reducer: {
        quotes: QuoteSlice  ,         //it cotains differnet slices in a single reducer of product state  
        filterAuth : filterAuthCardSlice,
        max : CountSlice,
    },
   
})

export default store