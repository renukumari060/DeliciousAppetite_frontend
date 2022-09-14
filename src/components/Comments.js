import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddComment } from "../store/user/thunks";
import { selectRecipeDetails } from "../store/recipe/selectors";
import ReactStars from "react-rating-stars-component";

export default function Comments() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();

  const recipe = useSelector(selectRecipeDetails);

  function submitForm(event) {
    event.preventDefault();
    dispatch(AddComment({ comment: comment, recipeId: recipe.id, rating }));
    comment("");
  }

  return (
    <div>
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
      <h2>Comments</h2>
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
    </div>
  );
}
