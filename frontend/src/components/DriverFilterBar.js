import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchTextField from "./SearchTextField";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MenuItem, Select } from "@mui/material";

const validationSchema = yup.object({
  name: yup
    .string('Enter your drivers name'),
  team: yup
    .string('Enter a team'),
  year: yup
    .number()
    .typeError('Season must be a type of number')
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
  refetch }) => {

  const formik = useFormik({
    initialValues: {
      name: "",
      team: "",
      nationality: "",
      sort: "age:desc"
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSearchName(values.name);
      setSearchTeam(values.team);
      setSearchYears(!isNaN(parseInt(values.year)) ? parseInt(values.year) : undefined);
      setSearchNationality(values.nationality);

      const sort = values.sort.split(':');
      setSortingOrder({field: sort[0], order: sort[1]});
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
        error={formik.touched.name && Boolean(formik.errors.name)} 
        helpertext={formik.touched.name && formik.errors.name}/>

      <SearchTextField
        value={formik.values.team}
        label="Team"
        handleChange={formik.handleChange}
        error={formik.touched.team && Boolean(formik.errors.team)} 
        helpertext={formik.touched.team && formik.errors.team}
        />

      <SearchTextField
        value={formik.values.year}
        label="Year"
        handleChange={formik.handleChange}
        error={formik.touched.year && Boolean(formik.errors.year)} 
        helpertext={formik.touched.year && formik.errors.year}
        />

      <SearchTextField
        value={formik.values.nationality}
        label="Nationality"
        handleChange={formik.handleChange}
        error={formik.touched.nationality && Boolean(formik.errors.nationality)} 
        helpertext={formik.touched.nationality && formik.errors.nationality}
        />

      <Select
        value={formik.values.sort}
        name="sort"
        onChange={formik.handleChange}
        label="Sorting order"
      >
        <MenuItem value="age:desc">Youngest to oldest</MenuItem>
        <MenuItem value="age:asc">Oldest to youngest</MenuItem>
        <MenuItem value="races:desc">Most races</MenuItem>
        <MenuItem value="races:asc">Least races</MenuItem>
      </Select>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default DriverFilterBar;


