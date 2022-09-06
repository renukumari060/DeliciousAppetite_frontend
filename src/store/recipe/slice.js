import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRecipes: [],
  recipesDetails: {},
};

const recipesSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    fetchRecipeSuccess: (state, action) => {
      console.log("action all recipe", action);
      const newRecipeArray = action.payload;
      state.allRecipes = newRecipeArray;
    },
  },
});

export const { fetchRecipeSuccess } = recipesSlice.actions;

export default recipesSlice.reducer;
