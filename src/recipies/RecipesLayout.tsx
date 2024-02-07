import { Link, Outlet, useOutlet, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Recipe as APIRecipe, getRecipes } from "../services/apiFacade";
import { useAuth } from "../security/Authprovider";

const btnStyle = {
  padding: "0px 3px",
  marginLeft: "5px",
  backgroundColor: "darkGreen",
  fontSize: "small",
  color: "white",
  textDecoration: "none",
  borderRadius: "3px",
  display: "inline-block",
};

const Recipes = () => {
  const [queryString] = useSearchParams();
  const initialCategory = queryString.get("category");
  const [recipes, setRecipes] = useState<Array<APIRecipe>>([]);
  const [category, setCategory] = useState<string | null>(initialCategory);
  const auth = useAuth();
  const outlet = useOutlet();

  useEffect(() => {
    getRecipes(category).then((res) => setRecipes(res));
  }, [category]);

  const recipeList = recipes.map((recipe) => {
    return (
      <li key={recipe.id}>
        <Link to={`${recipe.id}`}>{recipe.name}</Link>,
        {auth.isLoggedIn() && (
          <Link style={btnStyle} to="/add" state={recipe}>
            Edit
          </Link>
        )}
      </li>
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <h3>Recipes</h3>
        {category && (
          <div>
            Recipes with '{category}'{" "}
            <button
              onClick={() => {
                setCategory(null);
                getRecipes(null).then((res) => setRecipes(res));
              }}
            >
              Clear
            </button>
          </div>
        )}
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>{recipeList}</ul>
      </div>
      <div
        style={{
          border: "2px solid silver",
          backgroundColor: "lightsteelblue",
          borderRadius: "10px",
          flex: 4,
          flexDirection: "column",
          margin: 20,
          padding: 5,
        }}
      >
        {outlet || <h3>Select a recipe to see details</h3>}
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default Recipes;
