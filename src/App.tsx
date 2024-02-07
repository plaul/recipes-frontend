import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Categories } from "./recipies/Categories";
import Recipes from "./recipies/RecipesLayout";
import Recipe from "./recipies/Recipe";
import RecipeForm from "./recipies/RecipeForm";
import Login from "./security/Login";
import Logout from "./security/Logout";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/Authprovider";
import { getInfo, Info } from "./services/apiFacade";
import "./App.css";
import RequireAuth from "./security/RequireAuth";
import { useEffect, useState } from "react";

const Home = () => {
  const [info, setInfo] = useState<Info|null>(null);
  useEffect(() => {
    getInfo().then((data) => setInfo(data));
  }, []);
  useEffect(() => {}, []);
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to our homepage!</p>
      <img src="./logo.png" alt="logo" />
      {info && <>
      <h3>Info about the backend data used for this example</h3>
      <p><span style={{fontWeight:"bold"}}>Data taken from here:</span> {info.reference}</p>
      <p><span style={{fontWeight:"bold"}}>Data created:</span> {info.created}</p>
      <p>{info.info}</p>
      </>}
    </div>
  );
};

export default function App() {
  const auth = useAuth();
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/recipes">Recipes</NavLink>
          </li>
          {auth.isLoggedIn() && (
            <li>
              <NavLink to="/add">Add</NavLink>
            </li>
          )}
          <AuthStatus />
        </ul>
      </nav>
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/" element={<Categories />} />

        <Route path="/recipes" element={<Recipes />}>
          <Route path=":id" element={<Recipe />} />
        </Route>
        <Route
          path="/add"
          element={
            <RequireAuth>
              <RecipeForm />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
