import { Autocomplete, Divider, TextField } from '@mui/material';
import React from 'react';

function TeamsSelectField({ teams, setTeams }) {
  return (
    <>
      <Autocomplete
        multiple
        name="teams"
        className="teams"
        limitTags={2}
        options={teams}
        onChange={(event, value) => setTeams(value)}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            sx={{ ml: 1, flex: 1, minWidth: 150 }}
            label="Teams"
            placeholder="Team"
          />
        )}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </>
  );
}

export default TeamsSelectField;
