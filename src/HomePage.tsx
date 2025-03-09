import { Box, Button, Card, Divider, Grid2, Typography } from "@mui/material";
import { PageContainer } from "./components/PageContainer";
import { useEffect, useMemo, useState } from "react";
import { getInventory, saveInventory } from "./storage/paint.storage";
import { PaintEntry } from "./components/PaintEntry";
import { AddEditPaintDialog } from "./components/AddEditPaintDialog";
import { ConfirmationDialog } from "./components/ConfirmationDialog";
import { Paint } from "./models/paint";
import { PaintFilters } from "./components/PaintFilters";
import { PaintFilter } from "./models/filter";
import { applyFilter } from "./helper";
import { Brush } from "@mui/icons-material";

export function HomePage() {
  const [filter, setFilter] = useState<PaintFilter>({ search: "" , showZeros: false });

  const [confirmUnpin, setConfirmUnpin] = useState(false);

  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [editingPaint, setEditingPaint] = useState<Paint>();

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deletingPaint, setDeletingPaint] = useState<Paint>();

  const initialInventory = useMemo(() => getInventory(), []);
  const [inventory, setInventory] = useState(initialInventory);

  const sortedInventory = inventory.sort((a, b) => a.name.localeCompare(b.name));
  const pinnedInventory = sortedInventory.filter((x) => x.pinned);
  const filteredInventory = applyFilter(inventory, filter);

  useEffect(() => {
    if (inventory === initialInventory) return;
    saveInventory(inventory);
  }, [initialInventory, inventory])

  return (
    <PageContainer>
      <Box display="flex" alignItems="center">
        <Brush sx={{ mr: 1.5, fontSize: 45 }} />

        <Typography variant="h3" sx={{ flex: 1 }}>
          Paint Inventory
        </Typography>

        <PaintFilters inventory={inventory} filter={filter} onChange={setFilter}/>
      </Box>

      <Divider sx={{ mt: 8, mb: 8 }} />

      <Grid2 container spacing={10} width="100%">
        <Grid2 size={6}>
          <Box display="flex">
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

          <Card sx={{ mt: 2 }}>
            {filteredInventory.map((paint, index) => (
              <Box key={`${paint.id}-${index}`}>
                {index !== 0 && <Divider />}
                <PaintEntry
                  paint={paint}
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
        </Grid2>

        <Grid2 size={6}>
          <Box display="flex">
            <Typography variant="h4" flex={1}>
              Pinned
            </Typography>

            <Button onClick={() => setConfirmUnpin(true)} variant="outlined">
              Unpin All
            </Button>
          </Box>

          <Card sx={{ mt: 2 }}>
            {pinnedInventory.map((paint, index) => (
              <Box key={`${paint.id}-${index}-pinned`}>
                {index !== 0 && <Divider />}
                <PaintEntry
                  paint={paint}
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
        </Grid2>
      </Grid2>

      <ConfirmationDialog
        open={confirmUnpin}
        title="Unpin All Paints"
        onClose={() => setConfirmUnpin(false)}
        onConfirm={() => setInventory(inventory.map((x) => ({ ...x, pinned: false })))}
      >
        Are you sure you want to clear all your pinned paints?
      </ConfirmationDialog>
      
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
    </PageContainer>
  );
}