import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllCategories } from "../store/recipe/selectors";
import { fetchCategories } from "../store/recipe/thunks";

export default function Category(props) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  console.log("categories selector", categories);

  const { setFilterCategories, filterCategories } = props;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h2>Category</h2>
      {!categories
        ? "no categories yet"
        : categories.map((category) => {
            return (
              <div key={category.id}>
                <div>
                  <label>{category.categoryName}</label>
                  <input
                    type="checkbox"
                    checked={filterCategories.includes(category.id)}
                    onChange={() => {
                      if (filterCategories.includes(category.id)) {
                        setFilterCategories(
                          filterCategories.filter((cId) => cId !== category.id)
                        );
                      } else {
                        setFilterCategories([...filterCategories, category.id]);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
    </div>
  );
}
