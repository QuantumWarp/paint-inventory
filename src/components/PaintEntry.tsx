import { Box, Chip, Collapse, IconButton, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { Paint } from "../models/paint"
import { Add, Delete, Edit, HelpOutline, KeyboardArrowDown, PushPin, Remove } from "@mui/icons-material";
import { useState } from "react";
import { commonTypes } from "../models/types";

type Props = {
  paint: Paint;
  onUpdate: (paint: Paint) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function PaintEntry({ paint, onUpdate, onEdit, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const typeIcon = commonTypes[paint.type] || <HelpOutline />

  return (
    <Box sx={{
      "& .faded": { opacity: 0.3, transition: "opacity 0.2s" },
      "&:hover .faded": { opacity: 1 },
    }}>
      <ListItemButton onClick={() => onUpdate({ ...paint, pinned: !paint.pinned })}>
        <ListItemIcon>
          <Box sx={{ backgroundColor: paint.colorHex, height: 40, width: 40, borderRadius: 1 }} />
        </ListItemIcon>

        <Tooltip title={paint.type || "Unknown Type"}>
          <Box display="flex" alignItems="center" ml={-0.5} mr={1.5} className="faded">
            {typeIcon}
          </Box>
        </Tooltip>

        <ListItemText>
          <b>{paint.name}</b>
        </ListItemText>

        <ListItemIcon>
          <IconButton
            color={paint.pinned ? "info" : "default"}
            className={paint.pinned ? "" : "faded"}
          >
            <PushPin />
          </IconButton>

          <IconButton
            color={paint.pinned ? "info" : "default"}
            className="faded"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            <KeyboardArrowDown
              sx={{
                transform: expanded ? "rotate(180deg)" : undefined,
                transition: "transform 0.2s",
              }}
            />
          </IconButton>
        </ListItemIcon>
      </ListItemButton>

      <Collapse in={expanded}>
        <Box p={2} pt={1} display="flex" className="faded">
          <Box flex={1} px={2}>
            {paint.type && <Typography>Type: <b>{paint.type}</b></Typography>}
            {paint.brand && <Typography>Brand: <b>{paint.brand}</b></Typography>}
            <Typography>Amount: <b>{paint.amount || "None"}</b></Typography>
            {paint.notes && <Typography sx={{ mt: 1 }}>{paint.notes}</Typography>}

            {paint.tags.length > 0 && (
              <Box mt={1} display="flex" gap={1}>
                {paint.tags.map((x) => <Chip key={x} label={x} />)} 
              </Box>
            )}
          </Box>

          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box>
              <IconButton onClick={() => onUpdate({ ...paint, amount: paint.amount + 1 })}>
                <Add />
              </IconButton>

              <IconButton
                disabled={paint.amount <= 0}
                onClick={() => onUpdate({ ...paint, amount: paint.amount - 1 })}
              >
                <Remove />
              </IconButton>
            </Box>

            <Box>
              <IconButton onClick={onEdit}>
                <Edit color="info" />
              </IconButton>

              <IconButton onClick={onDelete}>
                <Delete color="error" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}