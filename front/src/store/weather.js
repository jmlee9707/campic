import { createSlice } from "@reduxjs/toolkit";

export const initialWeatherState = {
  celi: null,
  id : null
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    setWeather: (state, { payload }) => {
      state.weather = payload.weather;
    },
    reset: state => {
      Object.assign(state, initialWeatherState);
    }
  }
});


export const { reset, setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
