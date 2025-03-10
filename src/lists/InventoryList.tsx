import { Box, Button, Card, Divider, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { AddEditPaintDialog } from "../common/AddEditPaintDialog";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import { PaintEntry } from "../common/PaintEntry";
import { Paint } from "../models/paint";
import { PaintFilter } from "../models/filter";
import { applyFilter } from "../utils/helper";

type Props = {
  filter: PaintFilter;
  inventory: Paint[];
  setInventory: (inventory: Paint[]) => void; 
}

export function InventoryList({ filter, inventory, setInventory }: Props) {
  const [expanded, setExpanded] = useState<string>();

  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [editingPaint, setEditingPaint] = useState<Paint>();

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deletingPaint, setDeletingPaint] = useState<Paint>();

  const filteredInventory = applyFilter(inventory, filter);

  return (
    <Grid2 size={6} display="flex" flexDirection="column" height="100%">
      <Box display="flex" pr={2.4}>
        <Typography variant="h4" flex={1}>
          All
        </Typography>

        <Button
          onClick={() => {
            setOpenAddEdit(true);
            setEditingPaint(undefined);
          }}
          variant="outlined"
        >
          Add
        </Button>
      </Box>

      <Box sx={{ mt: 2, pr: 2, pb: 1, flex: 1, overflow: "auto", scrollbarGutter: "stable" }}>
        <Card>
          {filteredInventory.map((paint, index) => (
            <Box key={`${paint.id}-${index}`}>
              {index !== 0 && <Divider />}
              <PaintEntry
                paint={paint}
                expanded={expanded === paint.id}
                onExpand={(x) => setExpanded(x ? paint.id : undefined)}
                onUpdate={(updated) => {
                  setInventory(inventory.filter((x) => x.id !== paint.id).concat([updated]));
                }}
                onEdit={() => {
                  setOpenAddEdit(true);
                  setEditingPaint(paint);
                }}
                onDelete={() => {
                  setOpenConfirmDelete(true);
                  setDeletingPaint(paint);
                }}
              />
            </Box>
          ))}
        </Card>
      </Box>
      
      <ConfirmationDialog
        open={openConfirmDelete}
        title="Delete Paint"
        onConfirm={() => setInventory(inventory.filter((x) => x !== deletingPaint))}
        onClose={() => setOpenConfirmDelete(false)}
      >
        Are you sure you delete the <b>{deletingPaint?.name}</b> paint?
      </ConfirmationDialog>

      <AddEditPaintDialog
        inventory={inventory}
        open={openAddEdit}
        initialPaint={editingPaint}
        onSave={(updated) => setInventory(
          inventory.filter((x) => x !== editingPaint).concat([updated])
        )}
        onClose={() => setOpenAddEdit(false)}
      />
    </Grid2>
  );
}
