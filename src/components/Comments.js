import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddComment } from "../store/user/thunks";
import { selectRecipeDetails } from "../store/recipe/selectors";
import ReactStars from "react-rating-stars-component";
import { Grid, Typography } from "@mui/material";
import List from "@mui/material/List";

export default function Comments() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipeDetails);

  function submitForm(event) {
    event.preventDefault();
    dispatch(AddComment({ comment: comment, recipeId: recipe.id, rating }));
    setComment("");
    setRating("");
  }

  return (
    <>
      <Grid container item xs={12} md={12}>
        <Typography
          sx={{
            fontFamily: "Ubuntu,sans-serif",
            fontWeight: "700",
            color: "red",
            textAlign: "center",
          }}
          variant="h5"
        >
          {" "}
          Comments{" "}
        </Typography>
      </Grid>
      <Grid container item xs={12} md={12}>
        <List
          sx={{
            width: "90%",

            textAlign: "center",
            marginTop: "20px",
            marginBottom: "40px",
            border: "0.25px solid grey",
          }}
        >
          {!recipe.comments
            ? "no recipe yet"
            : recipe.comments.map((comment) => {
                return (
                  <div key={comment.id}>
                    <div>
                      {comment.userName} {"-"}
                      {comment.commentContent}
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={comment.rating}
                      />
                    </div>
                  </div>
                );
              })}
        </List>
      </Grid>
      <Grid container item xs={12} md={12}></Grid>
      <h2> Post Comments</h2>
      <br />
      <Form.Group controlId="formBasicText">
        <Form.Control
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          type="text"
          placeholder="Comment here"
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicText">
        <Form.Control
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          type="number"
          placeholder="rate here"
          required
        />
      </Form.Group>

      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Submit
        </Button>
      </Form.Group>
    </>
  );
}
