const SERVER_URL = "http://localhost:8000";
const CATEGORIES_URL = SERVER_URL + "/categories/";
const RECIPE_URL = SERVER_URL + "/recipes/";
const INFO_URL = SERVER_URL + "/info/";

interface Recipe {
  id: number;
  name: string;
  category: string;
  instructions: string;
  thumb: string;
  youTube: string;
  ingredients: string;
  source: string;
}

interface Info {
  reference: string;
  created: string;
  info: string;
}

let categories: Array<string> = [];
let recipes: Array<Recipe> = [];

async function getCategories(): Promise<Array<string>> {
  if (categories.length > 0) return [...categories];
  const res = await fetch(CATEGORIES_URL).then((res) => res.json());
  categories = [...res];
  return categories;
}
async function getRecipes(category: string | null): Promise<Array<Recipe>> {
  //if (recipes.length > 0) return [...recipes];
  console.log("category", category);
  const queryParams = category ? "?category=" + category : "";
  const res = await fetch(RECIPE_URL + queryParams).then((res) =>
    res.json()
  );
  recipes = res;
  return recipes;
}
async function getRecipe(id: number): Promise<Recipe> {
  //if (recipes.length > 0) return [...recipes];
  const recipe = await fetch(RECIPE_URL + id).then((res) => res.json());
  return recipe;
}
async function addRecipe(newRecipe:Recipe): Promise<Recipe> {
  const options = makeOptions("POST", newRecipe);
  const recipe = await fetch(RECIPE_URL, options).then((res) => res.json());
  return recipe;
}
async function deleteRecipe(id: number): Promise<Recipe> {
  const options = makeOptions("DELETE",null);
  const recipe = await fetch(RECIPE_URL + id,options).then((res) => res.json());
  return recipe;
}

async function getInfo():Promise<Info> {
  const info = await fetch(INFO_URL).then((res) => res.json());
  return info;
}

function makeOptions(method:string, body:object|null) {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

export type { Recipe,Info };
// eslint-disable-next-line react-refresh/only-export-components
export { getCategories, getRecipes, getRecipe, addRecipe,deleteRecipe,getInfo };
