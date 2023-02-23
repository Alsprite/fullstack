import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
      newNotification(state, action) {
        console.log(action.payload)
        return action.payload;
    },
  },
});
  
export const { newNotification } = notificationSlice.actions;
export default notificationSlice.reducer