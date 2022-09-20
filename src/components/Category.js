import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllCategories } from "../store/recipe/selectors";
import { fetchCategories } from "../store/recipe/thunks";
import { Container, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

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
      <Container>
        <Typography
          sx={{
            fontFamily: "Ubuntu,sans-serif",
            fontWeight: "700",
            color: "white",
            textAlign: "center",
          }}
          variant="h4"
        >
          Category
        </Typography>

        <Grid container item xs={12} md={12}>
          <Typography
            sx={{
              width: "100%",
              fontWeight: "400",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "40px",
              color: "white",
            }}
          >
            {!categories
              ? "no categories yet"
              : categories.map((category) => {
                  return (
                    <div key={category.id}>
                      <div>
                        <label>{category.categoryName}</label>
                        <input
                          type="checkbox"
                          sx={{
                            color: blue[800],
                            "&.Mui-checked": {
                              color: blue[600],
                            },
                          }}
                          checked={filterCategories.includes(category.id)}
                          onChange={() => {
                            if (filterCategories.includes(category.id)) {
                              setFilterCategories(
                                filterCategories.filter(
                                  (cId) => cId !== category.id
                                )
                              );
                            } else {
                              setFilterCategories([
                                ...filterCategories,
                                category.id,
                              ]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
          </Typography>
        </Grid>
        {/* {!categories
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
                            filterCategories.filter(
                              (cId) => cId !== category.id
                            )
                          );
                        } else {
                          setFilterCategories([
                            ...filterCategories,
                            category.id,
                          ]);
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })} */}
      </Container>
    </div>
  );
} // import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { selectAllCategories } from "../store/recipe/selectors";
// import { fetchCategories } from "../store/recipe/thunks";

// export default function Category(props) {
//   const dispatch = useDispatch();
//   const categories = useSelector(selectAllCategories);
//   console.log("categories selector", categories);

//   const { setFilterCategories, filterCategories } = props;

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Category</h2>
//       {!categories
//         ? "no categories yet"
//         : categories.map((category) => {
//             return (
//               <div key={category.id}>
//                 <div>
//                   <label>{category.categoryName}</label>
//                   <input
//                     type="checkbox"
//                     checked={filterCategories.includes(category.id)}
//                     onChange={() => {
//                       if (filterCategories.includes(category.id)) {
//                         setFilterCategories(
//                           filterCategories.filter((cId) => cId !== category.id)
//                         );
//                       } else {
//                         setFilterCategories([...filterCategories, category.id]);
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//     </div>
//   );
// }
