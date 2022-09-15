import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../store/recipe/thunks";
import { selectRecipeDetails } from "../store/recipe/selectors";
import Comments from "../components/Comments";

import { Grid, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

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
      <Grid
        container
        spacing={2}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={12}>
          <Typography
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: "700",
              color: "red",
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "40px",
            }}
            variant="h2"
          >
            {recipe.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <iframe
            alt={recipe.id}
            title={recipe.title}
            src={recipe.videoUrl}
            width="630"
            height="470"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
            allowFullScreen={true}
          />
        </Grid>
        <Grid
          sx={{
            marginLeft: "30px",
            marginBottom: "40px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            border: "0.25px solid grey",
          }}
          container
          spacing={1}
          item
          xs={9}
          md={3}
        >
          <Grid item xs={3} md={4}>
            <PeopleAltIcon /> Serving:
          </Grid>
          <Grid item xs={3} md={7}>
            {recipe.serving}
          </Grid>

          <Grid item xs={3} md={4}>
            <WatchLaterOutlinedIcon /> Cooking time:
          </Grid>
          <Grid item xs={3} md={7}>
            {recipe.time}
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />

      <Grid
        container
        spacing={1}
        item
        xs={11}
        md={12}
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Grid item xs={11} md={4} sx={{ border: "0.25px solid grey" }}>
          <Typography
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: "50",
              color: "primary.main",
            }}
            variant="h6"
          >
            <h2>Ingredients:</h2>
          </Typography>

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
        </Grid>
        <Grid item xs={11} md={6} sx={{ border: "0.25px solid grey" }}>
          <Typography
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: "50",
              color: "primary.main",
            }}
            variant="h6"
          >
            <h2>Steps to prepare:</h2>
          </Typography>

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
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={12}>
          <Comments />
        </Grid>
      </Grid>
    </>
  );
}
