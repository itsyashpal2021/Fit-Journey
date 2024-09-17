import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// posts
app.post("/getNutritions", async (req, res) => {
  try {
    const ingr = req.body.recipeItems;
    const appId = "28ecb5b6";
    const appKey = "9ab6a1e97450519bb811564933a6e9ff";
    const baseURL = "https://api.edamam.com/api/nutrition-details?app_id=";
    const url = baseURL.concat(appId, "&app_key=", appKey);

    const data = (await axios.post(url, { ingr })).data;
    res.json(data).end();
  } catch (error) {
    res.status(500).json({ error }).end();
  }
});

//serving static files in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (_req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
