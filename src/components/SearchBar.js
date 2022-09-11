import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllRecipes,
  selectSearchResult,
} from "../store/recipe/selectors";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { resultList } from "../store/recipe/slice";
import SearchResult from "./SearchResult";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const recipes = useSelector(selectAllRecipes);
  //const searchResult = useSelector(selectSearchResult);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    console.log("input", input);
    navigate(`/result/${input}`);
  }

  const filterSearchInput = [...recipes].filter((recipe) =>
    recipe.title.toLowerCase().includes(input.toLowerCase())
  );

  console.log("searched result", filterSearchInput);

  useEffect(() => {
    dispatch(resultList(filterSearchInput));
  }, [submit]);

  return (
    <div>
      <div>
        <h2>What do you want to try?</h2>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="search recipe"
        ></input>

        <button type="submit" onClick={submit}>
          {" "}
          Search Recipe
        </button>
        <SearchResult />
      </div>
      {/* {searchResult &&
        searchResult.map((result,key) => {
          return (
            <div key={result.id}>
              <NavLink to={`/result/${result.id}`}>
                <div>
                  <h2>Title: {result.title}</h2>
                </div>
              </NavLink>{" "}
              <p>Time: {result.time}</p>
              <iframe
                alt={result.id}
                title={result.title}
                src={result.videoUrl}
                width="580"
                height="370"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
                allowfullscreen="true"
              />
            </div>
          );
        })} */}
    </div>
  );
}
