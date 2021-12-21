import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const DriverFilterBar = ({onSearchButton, 
  setSearchName, 
  searchName, 
  setSearchTeam,
  searchTeam,
  setSearchYears,
  searchYears}) => {
  return (
    <Paper
      component="form"
      sx={{ 
        p: "2px 4px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent:"center" }}
    >
      <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="Drivers name"
        inputProps={{ "aria-label": "Drivers name" }}
        value={searchName} 
        onChange={(event) => setSearchName(event.target.value)}
        variant="standard"
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="Team (ex. mclaren, ferrari, bmw)"
        inputProps={{ "aria-label": "Raced team" }}
        value={searchTeam} 
        onChange={(event) => setSearchTeam(event.target.value)}
        variant="standard"
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="Driven year"
        inputProps={{ "aria-label": "Drove that year" }}
        value={searchYears} 
        onChange={(event) => setSearchYears(event.target.value)}
        variant="standard"
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: "10px" }} aria-label="search" onClick={onSearchButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default DriverFilterBar;


