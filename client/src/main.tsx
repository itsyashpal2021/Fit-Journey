import React from "react";
import ReactDOM from "react-dom/client";
import NutritionCalculator from "./components/Nutrition Calculator/RecipeForm";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NutritionCalculator />
  </React.StrictMode>
);
