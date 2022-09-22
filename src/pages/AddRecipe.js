import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { AddRecipeThunk } from "../store/user/thunks";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [time, setTime] = useState("");
  const [serving, setServing] = useState("");
  const [filter, setFilter] = useState("Breakfast");
  const [steps, setSteps] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [ingredients, setIngredients] = useState([
    { text: "", amount: "", units: "" },
  ]);
  const dispatch = useDispatch();

  function submitForm(event) {
    event.preventDefault();
    console.log(filter);

    const embedLink = videoUrl.replace("watch?v=", "embed/");

    dispatch(
      AddRecipeThunk({
        title,
        videoUrl: embedLink,
        time,
        serving,
        filter,
        steps,
        isPublic,
        ingredients,
      })
    );

    setTitle("");
    setVideoUrl("");
    setTime("");
    setServing("");
    setSteps("");
  }

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const updateIngredient = (newValue, key, index) => {
    setIngredients(
      ingredients.map((ingredient, innerIndex) => {
        if (innerIndex === index) {
          return { ...ingredient, [key]: newValue };
        } else {
          return ingredient;
        }
      })
    );
  };

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Post your recipe here:-</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Enter Title"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>videoUrl</Form.Label>
          <Form.Control
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            type="text"
            placeholder="Enter videoUrl"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control
            value={time}
            onChange={(event) => setTime(event.target.value)}
            type="text"
            placeholder="Cooking time"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Serving</Form.Label>
          <Form.Control
            value={serving}
            onChange={(event) => setServing(event.target.value)}
            type="text"
            placeholder="Serving"
          />
        </Form.Group>

        <h3>Category</h3>
        <select
          onChange={({ target }) => {
            console.log("target", target.value);
            setFilter(target.value);
          }}
        >
          <option value="Breakfast">BreakFast</option>
          <option value="Lunch">Lunch</option>
          <option value="Snacks">Snacks</option>
          <option value="Dinner">Dinner</option>
        </select>

        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={() => setIsPublic(!isPublic)}
                  checked={isPublic}
                />
              }
              onChange={(event) => setIsPublic(event.target.value)}
              label="Public"
            />
          </FormGroup>
        </div>

        <Form.Group>
          <Form.Label>Steps to prepare:</Form.Label>
          <Form.Control
            value={steps}
            onChange={(event) => setSteps(event.target.value)}
            type="text"
            placeholder="Tips or Steps to prepare"
          />
        </Form.Group>

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Post
          </Button>
        </Form.Group>
        <br />
        <br />

        {ingredients.map((ingredient, index) => {
          return (
            <div>
              <Form.Group>
                <Form.Control
                  value={ingredient.text}
                  onChange={(event) =>
                    updateIngredient(event.target.value, "text", index)
                  }
                  type="text"
                  placeholder="Ingredient"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  value={ingredient.amount}
                  onChange={(event) =>
                    updateIngredient(event.target.value, "amount", index)
                  }
                  type="number"
                  placeholder="Amount"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  value={ingredient.units}
                  onChange={(event) =>
                    updateIngredient(event.target.value, "units", index)
                  }
                  type="text"
                  placeholder="Units"
                />
              </Form.Group>
            </div>
          );
        })}

        <Form.Group className="mt-5">
          <Button
            variant="primary"
            onClick={() =>
              setIngredients([
                ...ingredients,
                { text: "", amount: "", units: "" },
              ])
            }
          >
            +
          </Button>
        </Form.Group>
        <Button>
          <Link to="/">Click here to go Recipe Page</Link>
        </Button>
      </Form>
    </Container>
  );
}
