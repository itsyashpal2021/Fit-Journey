import { Button, LinearProgress, Stack, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";
import axios from "axios";
import { ROUTES } from "../Consts";
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
      const recipeItems = input.split("\n");
      const res = await axios.post(ROUTES.CALCULATE_NUTRITION, { recipeItems });

      setResult(res.data);
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
          label="Enter Meal, separate individual items by new line"
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
