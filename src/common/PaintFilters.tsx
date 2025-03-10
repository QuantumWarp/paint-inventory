import { Autocomplete, Box, Checkbox, FormControlLabel, TextField, Tooltip } from "@mui/material";
import { Paint } from "../models/paint";
import { PaintFilter } from "../models/filter";
import { findSearchOptions } from "../utils/helper";

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
  const searchOptions = findSearchOptions(inventory);

  return (
    <Box display="flex" minWidth={400} gap={2}>
      <Tooltip title="Show duplicate named and zero amount paints">
        <FormControlLabel
          sx={{ width: 200 }}
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
    </Box>
  )
}
