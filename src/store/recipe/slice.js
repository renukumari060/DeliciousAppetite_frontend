import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRecipes: [],
  recipesDetails: {},
  searchResult: [],
  allCategories: [],
  allMyRecipes: [],
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
    recipeDetailsFetched: (state, action) => {
      console.log("action details recipe", action);
      state.recipesDetails = action.payload;
    },
    resultList: (state, action) => {
      console.log("search result", action);
      state.searchResult = action.payload;
    },
    fetchCategorySuccess: (state, action) => {
      console.log("action all category", action);
      const newCategoryArray = action.payload;
      state.allCategories = newCategoryArray;
    },
    fetchMyRecipeSuccess: (state, action) => {
      console.log("action all My recipes", action);
      const newMyRecipesArray = action.payload;
      state.allMyRecipes = newMyRecipesArray;
    },
  },
});

export const {
  fetchRecipeSuccess,
  recipeDetailsFetched,
  resultList,
  fetchCategorySuccess,
  fetchMyRecipeSuccess,
} = recipesSlice.actions;

export default recipesSlice.reducer;
