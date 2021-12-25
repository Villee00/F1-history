import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchTextField from "./SearchTextField";
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string('Enter your drivers name'),
  team: yup
    .string('Enter a team'),
  year: yup
    .number('Enter a season year in numbers')
    .max(2020, 'Season year must be between 1950-2020')
    .min(1950, 'Season year must be between 1950-2020'),
    Nationality: yup
    .string('Enter a drivers nationality'),
});

const DriverFilterBar = ({
  setSearchName,
  setSearchTeam,
  setSearchYears,
  setSearchNationality,
  setSortingOrder,
  handleOrderChange,
  refetch }) => {

  const formik = useFormik({
    initialValues: {
      name: "",
      team: "",
      nationality: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSearchName(values.name);
      setSearchTeam(values.team);
      setSearchYears(values.year);
      setSearchNationality(values.nationality);
      refetch();
    },
  });
  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <SearchTextField
        value={formik.values.name}
        label="Name"
        handleChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)} />

      <SearchTextField
        value={formik.values.team}
        label="Team"
        handleChange={formik.handleChange}
        error={formik.touched.team && Boolean(formik.errors.team)} />

      <SearchTextField
        value={formik.values.year}
        label="Year"
        handleChange={formik.handleChange}
        error={formik.touched.year && Boolean(formik.errors.year)} />

      <SearchTextField
        value={formik.values.nationality}
        label="Nationality"
        handleChange={formik.handleChange}
        error={formik.touched.nationality && Boolean(formik.errors.nationality)} />

      <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {/* <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortingOrder}
        onChange={handleOrderChange}
        label="Sorting order"
      >
        <MenuItem value={{ type: 'age', order: 'DESC' }}>Oldest to yuongest</MenuItem>
        <MenuItem value={{ type: 'age', order: 'ASC' }}>Yougest to oldest</MenuItem>
        <MenuItem value={{ type: 'gain', order: 'DESC' }}>positions gained</MenuItem>
      </Select> */}
    </Paper>
  );
};

export default DriverFilterBar;


