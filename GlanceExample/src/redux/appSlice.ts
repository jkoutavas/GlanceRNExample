import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  debug: true, // for useful debug info
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDebug(state, action: PayloadAction<boolean>) {
      state.debug = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setDebug} = appSlice.actions;
