import React from 'react';
import Stack from '@mui/material/Stack';
import { Box, Button, Chip, OutlinedInput, Select, TextField } from '@mui/material';

const DriverFilterBar = ({onSearchButton, setSearchName, searchName}) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <TextField label="Name" value={searchName} onChange={(event) => setSearchName(event.target.value)}></TextField>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >

      </Select>
      <Button onClick={onSearchButton}>onSearch</Button>
    </Stack>
  );
};

export default DriverFilterBar;
