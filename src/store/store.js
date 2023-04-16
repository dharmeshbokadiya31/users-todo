import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./../reducer/reducer";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
})