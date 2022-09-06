import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import recipesReducer from "./recipe/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    recipe: recipesReducer,
  },
});
