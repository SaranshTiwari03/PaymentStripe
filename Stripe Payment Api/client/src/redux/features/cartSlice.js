import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    carts: []
}

// card slice
const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {

        // add to cart
        addToCart: (state, action) => {

            const IteamIndex = state.carts.findIndex((item) => item.id === action.payload.id);

            if (IteamIndex >= 0) {
                state.carts[IteamIndex].qnty += 1
            } else {
                const temp = { ...action.payload, qnty: 1 }
                state.carts = [...state.carts, temp]

            }
        },

        // remove perticular iteams
        removeToCart:(state,action)=>{
            const data = state.carts.filter((ele)=>ele.id !== action.payload);
            state.carts = data
        },

        // remove single iteams
        removeSingleItem:(state,action)=>{
            const ItemIndex_dec = state.carts.findIndex((item) => item.id === action.payload.id);

            if(state.carts[ItemIndex_dec].qnty >=1){
                state.carts[ItemIndex_dec].qnty -= 1
            }

        },

        // clear cart
        emptycartItem:(state,action)=>{
            state.carts = []
        }
    }
});

export const { addToCart,removeToCart,removeSingleItem ,emptycartItem} = cartSlice.actions;

export default cartSlice.reducer;


