import {
  Alert,
  Button,
  LinearProgress,
  Slide,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { ROUTES } from "../Consts";
import NutritionInfo from "./NutritionInfo";

const NutritionCalculator = () => {
  const [result, setResult] = useState<NutritionInfo | null>(null);
  const [snackBarMessage, setSnackbarMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // fetches nutrition values for recipe.
  const onSubmit = async () => {
    try {
      const recipeItems = inputRef.current?.value?.trim().split("\n");
      if (!recipeItems || !recipeItems.length) return;

      setLoading(true);
      const res = await axios.post(ROUTES.CALCULATE_NUTRITION, {
        recipeItems,
      });
      setResult(res.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) setSnackbarMessage(error.message);
      setLoading(false);
      setResult(null);
    }
  };

  const closeSnackbar = () => setSnackbarMessage(undefined);

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
        <Snackbar
          open={snackBarMessage !== undefined}
          TransitionComponent={(props) => <Slide {...props} direction="left" />}
          autoHideDuration={2000}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Stack>
      {loading && <LinearProgress color="warning" />}
      <NutritionInfo result={result} />
    </Stack>
  );
};
export default NutritionCalculator;
