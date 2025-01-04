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
            if (state.page < 25) {
                state.page += 1;
            }
        },
        prevPage: (state) => {
            // Decrementa la página solo si es mayor que 1
            if (state.page > 1) {
                state.page -= 1;
            }
        },
    }
});

export const { setPage, nexPage, prevPage } = animeSlice.actions;
export default animeSlice.reducer;