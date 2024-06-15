import {
  Alert,
  Button,
  IconButton,
  LinearProgress,
  Slide,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { ROUTES } from "../Consts";

const NutritionCalculator = () => {
  const [recipeItems, setRecipeItems] = useState<string[]>([]);
  const [result, setResult] = useState({});
  const [snackBarMessage, setSnackbarMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // adds current input to recipe.
  const addItem = (): void => {
    if (!inputRef.current) return;

    const { value } = inputRef.current;
    inputRef.current.value = "";
    inputRef.current.focus();
    if (value.length) {
      setRecipeItems([...recipeItems, value]);
    }
  };

  // remove item from recipe.
  const removeItem = (item: string): void => {
    setRecipeItems((prevItems) => prevItems.filter((val) => val !== item));
  };

  // fetches nutrition values for recipe.
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(ROUTES.CALCULATE_NUTRITION, {
        recipeItems,
      });
      setResult(res.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) setSnackbarMessage(error.message);
      setLoading(false);
    }
  };

  const closeSnackbar = () => setSnackbarMessage(undefined);

  return (
    <Stack gap={2}>
      <Stack
        gap={2}
        style={{ width: "50rem", margin: "auto", marginTop: "10px" }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <TextField
            variant="outlined"
            size="small"
            margin="none"
            label="Enter Item"
            color="info"
            fullWidth
            focused
            inputRef={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem();
              }
            }}
            inputProps={{ style: { color: "white" } }}
          />
          <Button variant="contained" color="secondary" onClick={addItem}>
            Add
          </Button>
        </div>
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {recipeItems.map((item) => {
            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  borderRadius: "3px",
                  backgroundColor: "#31936a",
                  color: "white",
                  padding: "0 5px 0 5px",
                  maxHeight: "100%",
                }}
              >
                <p>{item}</p>
                <IconButton
                  aria-label="delete"
                  onClick={() => removeItem(item)}
                >
                  <DeleteIcon fontSize="small" sx={{ color: "error.light" }} />
                </IconButton>
              </div>
            );
          })}
        </Stack>
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
    </Stack>
  );
};
export default NutritionCalculator;
