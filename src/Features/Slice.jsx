import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allNotes: [],
  userNotes: [],
  resposne: [],
  user: [],
};

const Slice = createSlice({
  name: "jobQest",
  initialState,
  reducers: {
    setAllNotes: (state, action) => {
      state.allNotes = action.payload;
    },
    setUserNotes: (state, action) => {
      state.userNotes = action.payload;
      // console.log(action.payload);
    },

    setRespons: (state, action) => {
      state.resposne = action.payload;
      // console.log(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // console.log(action.payload);
    },
  },
});

export const { setRespons, setUser, setAllNotes, setUserNotes } = Slice.actions;
export default Slice.reducer;
