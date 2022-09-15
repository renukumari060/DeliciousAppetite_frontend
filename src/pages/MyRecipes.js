import { fetchMyRecipes } from "../store/recipe/thunks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllMyRecipes } from "../store/recipe/selectors";
import SearchBar from "../components/SearchBar";

import { Container, Grid, Typography, Button, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const myRecipes = useSelector(selectAllMyRecipes);
  console.log("My Recipes selector", MyRecipes);

  const [input, setInput] = useState("");

  console.log("input", input);

  const filterSearchInput = [...myRecipes].filter((recipe) =>
    recipe.title.toLowerCase().includes(input.toLowerCase())
  );
  console.log(" my recipe searched result", filterSearchInput);

  useEffect(() => {
    dispatch(fetchMyRecipes());
  }, [dispatch]);

  return (
    <Container>
      <SearchBar input={input} setInput={setInput} />
      <Divider textAlign="left" style={{ marginTop: 15, marginBottom: 15 }}>
        <Typography gutterBottom variant="h6" component="div">
          <span className="heading-color">My Recipes</span>
        </Typography>
      </Divider>
      <Grid container spacing={3} style={{ width: "100%" }}>
        {myRecipes &&
          filterSearchInput.map((recipe) => {
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
}
