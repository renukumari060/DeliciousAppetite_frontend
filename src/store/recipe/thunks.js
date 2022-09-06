import { fetchRecipeSuccess } from "./slice";
//import { apiUrl } from "../../config/constants";
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
