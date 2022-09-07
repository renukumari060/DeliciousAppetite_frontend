import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/recipe/thunks";
import { selectAllRecipes } from "../store/recipe/selectors";
import { NavLink } from "react-router-dom";

import { Container } from "react-bootstrap";

export const Homepage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  console.log("selectorResponse", recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Container>
      <h1>Recipes</h1>
      {recipes &&
        recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <NavLink to={`/recipe/${recipe.id}`}>
                <div>
                  <h2>Title: {recipe.title}</h2>
                </div>
              </NavLink>{" "}
              <p>Time: {recipe.time}</p>
              <iframe
                alt={recipe.id}
                title={recipe.title}
                src={recipe.videoUrl}
                width="580"
                height="370"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
                allowfullscreen="true"
              />
            </div>
          );
        })}
    </Container>
  );
};
