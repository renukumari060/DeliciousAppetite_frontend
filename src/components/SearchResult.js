import { useSelector } from "react-redux";

import { selectSearchResult } from "../store/recipe/selectors";

import { NavLink } from "react-router-dom";

export default function SearchResult() {
  const searchResult = useSelector(selectSearchResult);

  return (
    <div>
      <div>
        <h2>Today you are trying</h2>
      </div>
      {searchResult &&
        searchResult.map((result) => {
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
        })}
    </div>
  );
}
