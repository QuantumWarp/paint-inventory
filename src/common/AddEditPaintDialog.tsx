import { Autocomplete, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, TextField } from "@mui/material";
import { Paint } from "../models/paint";
import { useEffect, useRef, useState } from "react";
import { Brush } from "@mui/icons-material";
import { v4 as uuid } from "uuid";
import { findBrandOptions, findNameOptions, findTagOptions, findTypeOptions } from "../utils/helper";

const createDefaultPaint = () => ({
  id: uuid(),
  pinned: false,
  amount: 1,
  hide: false,

  colorHex: "",
  name: "",
  brand: "",
  type: "",
  tags: [],
  notes: "",
})

type Props = {
  inventory: Paint[];
  open: boolean;
  initialPaint?: Paint;
  onSave: (paint: Paint) => void;
  onClose: () => void;
}

export function AddEditPaintDialog({ inventory, open, initialPaint, onSave, onClose }: Props) {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number>(0);

  const [paint, setPaint] = useState<Paint>(createDefaultPaint());
  
  const handleColorChange = (colorHex: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPaint({ ...paint, colorHex });
    }, 50);
  };

  useEffect(() => {
    if (open) {
      setPaint(initialPaint || createDefaultPaint());
      if (colorPickerRef.current) {
        colorPickerRef.current.defaultValue = initialPaint?.colorHex || "#000000";
      }
    } else {
      setTimeout(() => { setPaint(createDefaultPaint()); }, 200);
    }
  }, [initialPaint, open]);
  
  const brandOptions = findBrandOptions(inventory);
  const typeOptions = findTypeOptions(inventory);
  const tagOptions = findTagOptions(inventory);
  const nameOptions = findNameOptions(inventory);

  const isExisting = open && nameOptions
      .filter((x) => x !== initialPaint?.name)
      .map((x) => x.toLowerCase().trim())
      .includes(paint.name.toLowerCase().trim());

  const isValid = paint.name.trim() && paint.colorHex.trim();

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        Add New Paint
      </DialogTitle>

      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          <input
            style={{ visibility: "hidden", position: "absolute" }}
            ref={colorPickerRef}
            type="color"
            defaultValue={initialPaint?.colorHex || "#ffffff"}
            onChange={(e) => handleColorChange(e.target.value)}
          />

          <Grid2 size={12} gap={2} display="flex">
            <Button
              variant="contained"
              sx={{ backgroundColor: paint.colorHex || "#ffffff" }}
              onClick={() => colorPickerRef.current?.click()}
            >
              <Brush sx={({ palette }) => ({
                color: palette.getContrastText(paint.colorHex || "#ffffff")
              })} />
            </Button>

            <TextField
              label="Name"
              required
              fullWidth
              color={isExisting ? "warning" : undefined}
              helperText={isExisting ? "Name already exists" : undefined}
              value={paint.name}
              onChange={(x) => setPaint({ ...paint, name: x.target.value })}
            />
          </Grid2>

          <Grid2 size={6}>
            <Autocomplete
              fullWidth
              freeSolo
              value={paint.brand}
              onInputChange={(_, value) => setPaint({ ...paint, brand: value || "" })}
              options={brandOptions}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />
          </Grid2>

          <Grid2 size={6}>
            <Autocomplete
              fullWidth
              freeSolo
              value={paint.type}
              onInputChange={(_, value) => setPaint({ ...paint, type: value || "" })}
              options={typeOptions}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
          </Grid2>

          <Grid2 size={12}>
            <Autocomplete
              fullWidth
              multiple
              options={tagOptions}
              freeSolo
              onChange={(_, value) => setPaint({ ...paint, tags: value.filter((x) => Boolean(x)) })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Tags" + (params.inputProps.value?.toString().trim() ? " (Enter to confirm)" : "")}
                />
              )}
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

          <Grid2 size={12}>
            <TextField
              label="Notes"
              fullWidth
              multiline
              minRows={3}
              value={paint.notes}
              onChange={(x) => setPaint({ ...paint, notes: x.target.value })}
            />
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          disabled={!isValid}
          onClick={() => {
            onSave({
              ...paint,
              name: paint.name.trim(),
              brand: paint.brand.trim(),
              type: paint.type.trim(),
              tags: paint.tags.map((x) => x.trim()).sort(),
              notes: paint.notes.trim(),
            });
            onClose();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
