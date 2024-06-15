import {
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Nutrient = {
  label: string;
  quantity: number;
  unit: string;
};

type Nutrients = {
  [key: string]: Nutrient;
};

type TotalDaily = {
  [key: string]: {
    label: string;
    quantity: number;
    unit: string;
  };
};

type IngredientParsed = {
  quantity: number;
  measure: string;
  foodMatch: string;
  food: string;
  foodId: string;
  weight: number;
  retainedWeight: number;
  nutrients: Nutrients;
  measureURI: string;
  status: string;
};

type Ingredient = {
  text: string;
  parsed: IngredientParsed[];
};

type TotalNutrientsKCal = {
  ENERC_KCAL: Nutrient;
  PROCNT_KCAL: Nutrient;
  FAT_KCAL: Nutrient;
  CHOCDF_KCAL: Nutrient;
};

type NutritionInfo = {
  uri: string;
  yield: number;
  calories: number;
  totalCO2Emissions: number;
  co2EmissionsClass: string;
  totalWeight: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  totalNutrients: Nutrients;
  totalDaily: TotalDaily;
  ingredients: Ingredient[];
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrientsKCal: TotalNutrientsKCal;
};

const NutritionInfo = (props: { result: NutritionInfo | null }) => {
  const { result } = props;

  const getChipBox = (arr: string[], bgColor: string) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {arr.map((label) => (
        <Chip
          key={label}
          label={label}
          variant="filled"
          sx={{ backgroundColor: bgColor, borderRadius: "5px", margin: "3px" }}
        />
      ))}
    </div>
  );

  const getTableRows = () => {
    if (!result) return <></>;

    return Object.keys(result.totalNutrients).map((key) => {
      const info = result.totalNutrients[key];
      const dailyInfo = result.totalDaily[key];
      const name = info.label;
      const quantity = info.quantity.toFixed(2).toString() + info.unit;
      const percentage = dailyInfo
        ? dailyInfo.quantity.toFixed(2).toString() + dailyInfo.unit
        : "-";

      return (
        <TableRow
          key={name}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {name}
          </TableCell>
          <TableCell>{quantity}</TableCell>
          <TableCell>{percentage}</TableCell>
        </TableRow>
      );
    });
  };

  if (result === null) return null;
  return (
    <Stack gap={2}>
      <Stack direction={"row"} gap={2}>
        <Card sx={{ width: "30%" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "warning.dark" }}
            >
              Summary
            </Typography>
            <div style={{ paddingLeft: "8px" }}>
              <Typography color="warning.main">
                Energy: {result.calories}Kcal
              </Typography>
              <Typography color="secondary.main">
                Weight: {result.totalWeight.toFixed(3)}g
              </Typography>
              <Typography color="success.main">
                Protein: {result.totalNutrients["PROCNT"].quantity.toFixed(3)}g
              </Typography>
              <Typography color="error.main">
                Fat: {result.totalNutrients["FAT"].quantity.toFixed(3)}g
              </Typography>
            </div>

            <Typography
              variant="h6"
              component="div"
              sx={{ color: "info.main" }}
              mt={3}
            >
              Dish Type
            </Typography>
            {getChipBox(result.mealType, "warning.dark")}
            {getChipBox(result.cuisineType, "warning.main")}
            {getChipBox(result.dishType, "secondary.dark")}
            {getChipBox(result.dietLabels, "info.dark")}

            <Typography
              variant="h6"
              component="div"
              sx={{ color: "success.main" }}
              mt={3}
            >
              Health Labels
            </Typography>
            {getChipBox(result.healthLabels, "success.dark")}
          </CardContent>
        </Card>
        <Card sx={{ width: "70%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#24ffd8" }}>Name</TableCell>
                <TableCell sx={{ color: "#24ffd8" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#24ffd8" }}>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{getTableRows()}</TableBody>
          </Table>
        </Card>
      </Stack>
    </Stack>
  );
};
export default NutritionInfo;
