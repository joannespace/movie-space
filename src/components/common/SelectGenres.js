import React from "react";
import { FSelect } from "../forms";

function SelectGenres({ genres }) {
  return (
    <FSelect
      name="genresFilters"
      label="Genres Filter"
      size="small"
      sx={{ width: 300 }}
    >
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </FSelect>
  );
}

export default SelectGenres;
