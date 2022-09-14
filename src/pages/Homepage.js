import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/recipe/thunks";
import { selectAllRecipes } from "../store/recipe/selectors";
import { Container, Grid, Typography, Button, Divider } from "@mui/material";
import SearchBar from "../components/SearchBar";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Category from "../components/Category";

export const Homepage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  console.log("homepage recipe", recipes);

  const [input, setInput] = useState("");
  const [filterCategories, setFilterCategories] = useState([]); // [2, 4]

  console.log("filterCategories", filterCategories);
  const filterSearchInput = [...recipes].filter((recipe) =>
    recipe.title.toLowerCase().includes(input.toLowerCase())
  );

  const filterCategoryInput = [...filterSearchInput].filter((recipe) =>
    filterCategories.length
      ? filterCategories.includes(recipe.categoryId)
      : true
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Container>
      <SearchBar input={input} setInput={setInput} />
      <Category
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
      />
      <Divider textAlign="left" style={{ marginTop: 15, marginBottom: 15 }}>
        <Typography gutterBottom variant="h6" component="div">
          <span className="heading-color">All Recipes</span>
        </Typography>
      </Divider>
      <Grid container spacing={3} style={{ width: "100%" }}>
        {recipes &&
          filterCategoryInput.map((recipe) => {
            return (
              <Grid item key={recipe.id}>
                <Card sx={{ maxWidth: 250 }} variant="outlined">
                  <iframe
                    alt={recipe.id}
                    title={recipe.title}
                    src={recipe.videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
                    allowfullscreen="true"
                  />
                  <CardContent>
                    <Typography
                      className="heading-color"
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      Title: {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time: {recipe.time}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={`/recipe/${recipe.id}`}>
                      View Recipe
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};
