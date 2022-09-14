import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../store/recipe/thunks";
import { selectRecipeDetails } from "../store/recipe/selectors";
import Comments from "../components/Comments";

export default function DetailsPage() {
  const { id } = useParams();

  const recipe = useSelector(selectRecipeDetails);
  console.log("details selector", recipe);
  const dispatch = useDispatch();

  const steps = recipe?.steps?.split(".");
  console.log("steps", steps);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  return (
    <>
      {!recipe ? (
        "Loading"
      ) : (
        <>
          <div>
            <div key={recipe.id}>
              <h2>Title: {recipe.title}</h2>
              <iframe
                alt={recipe.id}
                title={recipe.title}
                src={recipe.videoUrl}
                width="880"
                height="570"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
                allowFullScreen={true}
              />
              <div>
                <h2>Tips for Future Reference: </h2>

                {!steps
                  ? "no steps"
                  : steps.map((step) => {
                      return (
                        <div>
                          <ul>
                            <li> {step}</li>
                          </ul>
                        </div>
                      );
                    })}
              </div>
              <br />
              <div>
                <h3> Serving: </h3>
                {recipe.serving}
                <h3>Time: </h3>
                {recipe.time}
              </div>
              <br />

              <h2>Ingredients</h2>
            </div>

            {!recipe.ingredients
              ? "no recipe yet"
              : recipe.ingredients.map((ingredient) => {
                  return (
                    <div key={ingredient.id}>
                      <div>
                        <input type="checkbox" />
                        {ingredient.text} {"-"} {ingredient.amount}{" "}
                        {ingredient.units}
                      </div>
                    </div>
                  );
                })}
          </div>
          <br />
          <Comments />
        </>
      )}
    </>
  );
}
