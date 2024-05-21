import { createSlice } from "@reduxjs/toolkit";

// Dastlabki holatni localStorage dan o'qiymiz
const initialState = {
    crypto: JSON.parse(localStorage.getItem("Crypto") || "[]")
}

const cryptoSlice = createSlice({
    name: "crypto", // Slice nomini to'g'ri yozamiz
    initialState,
    reducers: {
        addCrypto: (state, action) => { // Reducer nomi aniqroq qilib berilgan
            state.crypto.unshift(action.payload); // Yangi crypto ni state ga qo'shamiz
            localStorage.setItem("Crypto", JSON.stringify(state.crypto)); // localStorage yangilanadi
        }
    }
})

// Actions va reducerni eksport qilamiz
export const { addCrypto } = cryptoSlice.actions;
const cryptoReducer = cryptoSlice.reducer;

export default cryptoReducer;
