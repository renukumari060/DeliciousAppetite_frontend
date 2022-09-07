import { fetchRecipeSuccess, recipeDetailsFetched } from "./slice";
import { apiUrl } from "../../config/constants";
const axios = require("axios");

//HomePage
export const fetchRecipes = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("http://localhost:4000/recipe");
    console.log("allRecipes thunks response", response);

    dispatch(fetchRecipeSuccess(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

//DEATAILS PAGE

export const fetchRecipeById = (id) => {
  return async (dispatch, getState) => {
    try {
      console.log("hello");
      const response = await axios.get(`${apiUrl}/recipe/${id}`);

      console.log("deatils", response.data.recipe);

      dispatch(recipeDetailsFetched(response.data.recipe));
    } catch (e) {
      console.log(e);
    }
  };
};
