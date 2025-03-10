import { Autocomplete, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, TextField, Typography } from "@mui/material";
import { Paint } from "../models/paint";
import { useState } from "react";
import { findTagOptions } from "../utils/helper";

type Props = {
  inventory: Paint[];
  open: boolean;
  onSave: (tag: string) => void;
  onClose: () => void;
}

export function ApplyPinnedTag({ inventory, open, onSave, onClose }: Props) {
  const [tag, setTag] = useState<string>("");
  
  const tagOptions = findTagOptions(inventory);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        Apply Tag
      </DialogTitle>

      <DialogContent>
        <Typography>
          This will add the given tag to all paints in your pinned list.
        </Typography>

        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <Grid2 size={12}>
            <Autocomplete
              fullWidth
              options={tagOptions}
              freeSolo
              onInputChange={(_, value) => setTag(value || "")}
              renderInput={(params) => <TextField {...params} label="Tag" />}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip variant="outlined" label={option} key={key} {...tagProps} />
                  );
                })
              }
            />
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          disabled={!tag.trim()}
          onClick={() => {
            onSave(tag.trim());
            onClose();
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
