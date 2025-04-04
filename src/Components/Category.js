import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import '../Styles/Category.css'

const jeweltype = [
  { type: "diamond", category: "bangles" },
  { type: "diamond", category: "chains" },
  { type: "diamond", category: "necklaces" },
  { type: "diamond", category: "rings" },
  { type: "diamond", category: "bracelets" },
  { type: "diamond", category: "earrings" },
  { type: "platinum", category: "bangles" },
  { type: "platinum", category: "chains" },
  { type: "platinum", category: "necklaces" },
  { type: "platinum", category: "rings" },
  { type: "platinum", category: "bracelets" },
  { type: "platinum", category: "earrings" },
  { type: "gold", category: "bangles" },
  { type: "gold", category: "chains" },
  { type: "gold", category: "necklaces" },
  { type: "gold", category: "rings" },
  { type: "gold", category: "bracelets" },
  { type: "gold", category: "earrings" },
  { type: "silver", category: "bangles" },
  { type: "silver", category: "chains" },
  { type: "silver", category: "necklaces" },
  { type: "silver", category: "rings" },
  { type: "silver", category: "bracelets" },
  { type: "silver", category: "earrings" },
  { type: "pearl", category: "bangles" },
  { type: "pearl", category: "chains" },
  { type: "pearl", category: "necklaces" },
  { type: "pearl", category: "rings" },
  { type: "pearl", category: "bracelets" },
  { type: "pearl", category: "earrings" },
];

function Category({ onFilterChange }) {
  // Extract unique types and categories
  const uniqueTypes = [...new Set(jeweltype.map((item) => item.type))];
  const uniqueCategories = [...new Set(jeweltype.map((item) => item.category))];

  return (
    <Stack spacing={2} sx={{
      width: "250px", 
  }}>
    <div className="search-bars">
    {/* Type Selection */}
    <Autocomplete
      multiple
      id="types-autocomplete"
      options={uniqueTypes}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      onChange={(event, selectedTypes) => onFilterChange("types", selectedTypes)}
      renderInput={(params) => (
        <TextField {...params} label="Select Jewelry Type" placeholder="Favorites"  className="text"/>
      )}
    />
  
    {/* Category Selection */}
    <Autocomplete
      multiple
      id="categories-autocomplete"
      options={uniqueCategories}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      onChange={(event, selectedCategories) => onFilterChange("categories", selectedCategories)}
      renderInput={(params) => (
        <TextField {...params} label="Select Jewelry Category" placeholder="Favorites" className="text" />
      )}
    />
    </div>
  </Stack>
  
  );
}

export default Category;
