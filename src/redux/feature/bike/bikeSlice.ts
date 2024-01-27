import { TBikeInitState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TBikeInitState = {
  bikes: null,
};

const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
    setBikes: (state, action) => {
      const { bikes } = action.payload;
      state.bikes = bikes;
    },
  },
});

export default bikeSlice.reducer;
