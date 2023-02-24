import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
      newNotification(state, action) {
        return action.payload;
    },
  },
});

// eslint-disable-next-line no-unused-vars
let timeout = null

export const initialization = (message, delay) => {
  return async (dispatch) => {
    dispatch(newNotification(message))

    timeout = setTimeout(() => dispatch(newNotification(null)), delay);

  }
}

export const { newNotification } = notificationSlice.actions;
export default notificationSlice.reducer