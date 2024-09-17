import { Button, LinearProgress, Stack, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";
import axios from "axios";
import NutritionInfo from "./NutritionInfo";
import { BaseProps } from "../../App";

const NutritionCalculator: FC<BaseProps> = (props) => {
  const [result, setResult] = useState<NutritionInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // fetches nutrition values for input recipe.
  const onSubmit = async () => {
    try {
      const input = inputRef.current?.value.trim();
      if (!input || !input.length) return;

      setLoading(true);

      const ingr = input.split("\n");
      const appId = "28ecb5b6";
      const appKey = "9ab6a1e97450519bb811564933a6e9ff";
      const baseURL = "https://api.edamam.com/api/nutrition-details?app_id=";
      const url = baseURL.concat(appId, "&app_key=", appKey);
      const { data } = await axios.post(url, { ingr });

      setResult(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      props.setError("Something went wrong");
      setResult(null);
      setLoading(false);
    }
  };

  return (
    <Stack gap={2} p={2}>
      <Stack
        gap={2}
        style={{ width: "50rem", margin: "auto", marginTop: "10px" }}
      >
        <TextField
          variant="outlined"
          label="Enter Recipe, separate individual items by new line"
          inputRef={inputRef}
          multiline
          focused
        />
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
      {loading && <LinearProgress color="warning" />}
      <NutritionInfo result={result} />
    </Stack>
  );
};
export default NutritionCalculator;
