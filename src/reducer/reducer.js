import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
        const newPayload = {
            ...action.payload,
        }
        state.push(newPayload);
    },
    userUpdated(state, action) {
      const { id, userData } = action.payload;
      const updatedState = state.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            username: userData.username,
            gender: userData.gender,
            hobbies: userData.hobbies,
            selectedDate: userData.selectedDate,
            taskname: userData.taskname,
            status: userData.status,
            age: userData.age
          }
        } else {
          return user;
        }
      })
      return updatedState
    },
    userDeleted(state, action) {
        const { id } = action.payload;
        const existingUser = state.find((user) => user.id === id);
        if (existingUser) {
          return state.filter((user) => user.id !== id);
        }
    }
  },
});

export const { userAdded, userDeleted, userUpdated } = usersSlice.actions

export default usersSlice.reducer