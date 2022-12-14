import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import { fetchRecipeById } from "../recipe/thunks";

import {
  loginSuccess,
  logOut,
  tokenStillValid,
  addRecipeSuccess,
  addCommentSuccess,
} from "./slice";

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

//thunks for Adding Recipe

export const AddRecipeThunk = ({
  title,
  videoUrl,
  time,
  serving,
  filter,
  steps,
  isPublic,
  ingredients,
}) => {
  return async (dispatch, getState) => {
    try {
      console.log("hello from Add recipe", filter);

      const token = selectToken(getState());

      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/recipe`,
        {
          title,
          videoUrl,
          time,
          serving,
          filter,
          steps,
          isPublic,
          ingredients,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("recipe", response);
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(addRecipeSuccess(response.data.newRecipe));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

//thunks for Adding comment

export const AddComment = ({ comment, recipeId, rating }) => {
  return async (dispatch, getState) => {
    try {
      console.log("hello from Add comment", comment, recipeId);

      const token = selectToken(getState());

      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/recipe/${recipeId}`,
        {
          comment,
          recipeId,
          rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("comment", response);
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(fetchRecipeById(recipeId));

      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
