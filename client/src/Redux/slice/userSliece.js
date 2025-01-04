import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
     name: 'user',
     initialState: {
         userRegistered: false,
         user: {
            pepito: "hola",
         },
     },
     reducers: {
       setUser: (state, action) => {
        console.log(action.payload);
         state.user = action.payload;
       },
     },
   });
   
export const { setUser } = userSlice.actions;
export default userSlice.reducer;