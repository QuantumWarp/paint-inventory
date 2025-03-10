import { Box, Button, Card, Divider, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { AddEditPaintDialog } from "../common/AddEditPaintDialog";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import { PaintEntry } from "../common/PaintEntry";
import { Paint } from "../models/paint";
import { ApplyPinnedTag } from "../common/ApplyPinnedTag";

type Props = {
  inventory: Paint[];
  setInventory: (inventory: Paint[]) => void; 
}

export function PinnedList({ inventory, setInventory }: Props) {
  const [expanded, setExpanded] = useState<string>();
  const [confirmUnpin, setConfirmUnpin] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editingPaint, setEditingPaint] = useState<Paint>();

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deletingPaint, setDeletingPaint] = useState<Paint>();
  
  const [openTag, setOpenTag] = useState(false);

  const pinnedInventory = inventory.filter((x) => x.pinned);

  return (
    <Grid2 size={6} height="100%">
      <Box display="flex" pr={2.4} gap={1}>
        <Typography variant="h4" flex={1}>
          Pinned
        </Typography>

        <Button onClick={() => setOpenTag(true)} variant="outlined">
          Apply Tag
        </Button>

        <Button onClick={() => setConfirmUnpin(true)} variant="outlined">
          Unpin All
        </Button>
      </Box>

      <Box sx={{ mt: 2, pr: 2, pb: 1, flex: 1, overflow: "auto", scrollbarGutter: "stable" }}>
        <Card>
          {pinnedInventory.map((paint, index) => (
            <Box key={`${paint.id}-${index}-pinned`}>
              {index !== 0 && <Divider />}
              <PaintEntry
                paint={paint}
                expanded={expanded === paint.id}
                onExpand={(x) => setExpanded(x ? paint.id : undefined)}
                onUpdate={(updated) => {
                  setInventory(inventory.filter((x) => x.id !== paint.id).concat([updated]));
                }}
                onEdit={() => {
                  setOpenEdit(true);
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
        open={openEdit}
        initialPaint={editingPaint}
        onSave={(updated) => setInventory(
          inventory.filter((x) => x !== editingPaint).concat([updated])
        )}
        onClose={() => setOpenEdit(false)}
      />

      <ApplyPinnedTag
        inventory={inventory}
        open={openTag}
        onSave={(tag) => setInventory(inventory.map((x) => ({ ...x, tags: x.pinned ? x.tags.concat([tag]) : x.tags })))}
        onClose={() => setOpenTag(false)}
      />
    </Grid2>
  );
}
