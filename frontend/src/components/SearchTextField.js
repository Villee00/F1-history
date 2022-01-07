import { Divider, TextField } from '@mui/material'
import React from 'react'

function SearchTextField({ value, label, handleChange, error, helpertext }) {
  return (
    <>
      <TextField
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        label={label}
        sx={{ ml: 1, flex: 1, minWidth: 150 }}
        value={value}
        onChange={handleChange}
        error={error}
        type="search"
        variant="standard"
        helperText={helpertext}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </>
  )
}

export default SearchTextField
