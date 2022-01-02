import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchTextField from "./SearchTextField";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MenuItem, Select } from "@mui/material";
import { GET_DRIVER_FILTERS } from "../queries";
import { useQuery } from "@apollo/client";
import TeamsSelectField from "./TeamsSelectField";

const validationSchema = yup.object({
  name: yup
    .string('Enter your drivers name'),
  year: yup
    .number()
    .typeError('Season must be a type of number')
    .max(2020, 'Season year must be between 1950-2020')
    .min(1950, 'Season year must be between 1950-2020'),
  Nationality: yup
    .string('Enter a drivers nationality'),
});

const DriverFilterBar = ({ handleSearch }) => {
  const { data, loading, error } = useQuery(GET_DRIVER_FILTERS);
  const [teams, setTeams] = React.useState([])

  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
      sort: "age:desc"
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSearch({...values, teams: teams.map(team => team.id)}),
  });

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
      }}
    >
      <SearchTextField
        value={formik.values.name}
        label="Name"
        handleChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helpertext={formik.touched.name && formik.errors.name} />

      <TeamsSelectField teams={data.getDriverFilters} setTeams={setTeams}/>

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


