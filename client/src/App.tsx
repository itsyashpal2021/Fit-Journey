import {
  Box,
  Tabs,
  Tab,
  styled,
  TabProps,
  TabsProps,
  Alert,
  Slide,
  Snackbar,
} from "@mui/material";
import NutritionCalculator from "./components/Nutrition Calculator/RecipeForm";
import { useState } from "react";

const StyledTabs = styled((props: TabsProps) => <Tabs {...props} />)(() => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#1de9b6",
  },
}));

const StyledTab = styled((props: TabProps) => <Tab {...props} />)(() => ({
  "&.Mui-selected": {
    color: "#1de9b6",
  },
}));

export interface BaseProps {
  setError: (message: string) => void;
}

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const closeSnackbar = () => setError(undefined);

  return (
    <Box>
      <StyledTabs
        value={activeTab}
        onChange={(_evt, newValue) => setActiveTab(newValue)}
        sx={{ bgcolor: "rgba(0,0,0,0.75)" }}
        centered
      >
        <StyledTab label="Nutrition Calculator" />
        <StyledTab label="Item 2" />
      </StyledTabs>
      {activeTab === 0 ? <NutritionCalculator setError={setError} /> : "hello"}

      <Snackbar
        open={error !== undefined}
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
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
