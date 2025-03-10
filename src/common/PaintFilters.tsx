import { Autocomplete, Box, Checkbox, FormControlLabel, TextField, Tooltip } from "@mui/material";
import { Paint } from "../models/paint";
import { PaintFilter } from "../models/filter";
import { findBrandOptions, findTagOptions, findTypeOptions } from "../utils/helper";

type Props = {
  inventory: Paint[];
  filter: PaintFilter;
  onChange: (filter: PaintFilter) => void;
}

export function PaintFilters({
  inventory,
  filter,
  onChange,
}: Props) {
  const brandOptions = findBrandOptions(inventory);
  const typeOptions = findTypeOptions(inventory);
  const tagOptions = findTagOptions(inventory);

  const searchOptions = brandOptions.concat(typeOptions).concat(tagOptions).sort();

  const similarToOptions = inventory.filter((x, index, arr) =>
    arr.findIndex((el) => el.name === x.name && el.colorHex === x.colorHex) === index
  )

  return (
    <Box display="flex" minWidth={600} gap={1} mt={1}>
      <Tooltip title="Show duplicate names and paints with zero amount">
        <FormControlLabel
          sx={{ minWidth: 128 }}
          label="Show None"
          control={
            <Checkbox
              checked={filter.showZeros}
              onChange={(_, checked) => onChange({ ...filter, showZeros: checked })}
            />
          }
        />
      </Tooltip>

      <Autocomplete
        fullWidth
        freeSolo
        value={filter.search}
        onInputChange={(_, value) => onChange({ ...filter, search: value || "" })}
        options={searchOptions}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />

      <Autocomplete
        fullWidth
        value={inventory.find((x) => x.id === filter.similarId) || null}
        onChange={(_, value) => onChange({ ...filter, similarId: value?.id || "" })}
        options={similarToOptions}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Box sx={{ backgroundColor: option.colorHex, height: 20, width: 20, borderRadius: 1, mr: 1 }} />
            {option.name}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Similar To" />}
      />
    </Box>
  )
}
