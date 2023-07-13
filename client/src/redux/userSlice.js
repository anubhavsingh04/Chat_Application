import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    allUsers:[],
  },

  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers:(state,action)=>{
      state.allUsers=action.payload
    }
  },
});

export const { SetUser,setAllUsers } =userSlice.actions;

export default userSlice.reducer;