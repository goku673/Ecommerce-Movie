import { createSlice } from "@reduxjs/toolkit";

const animeSlice = createSlice({
    name: 'anime',
    initialState: {
        page: 1,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        nexPage: (state) => {
            // Incrementa la página solo si es menor que 25
            
                state.page += 1;
            
        },
        prevPage: (state) => {
            
                state.page -= 1;
            
        },
    }
});

export const { setPage, nexPage, prevPage } = animeSlice.actions;
export default animeSlice.reducer;