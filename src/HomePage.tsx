import { Box, Divider, Grid2, Typography } from "@mui/material";
import { PageContainer } from "./common/PageContainer";
import { useEffect, useMemo, useState } from "react";
import { getInventory, saveInventory } from "./storage/paint.storage";
import { PaintFilters } from "./common/PaintFilters";
import { PaintFilter } from "./models/filter";
import { Brush } from "@mui/icons-material";
import { PinnedList } from "./lists/PinnedList";
import { InventoryList } from "./lists/InventoryList";

export function HomePage() {
  const [filter, setFilter] = useState<PaintFilter>({
    search: "" , similarId: "", showZeros: false
  });

  const initialInventory = useMemo(() => getInventory(), []);
  const [inventory, setInventory] = useState(initialInventory);

  const sortedInventory = inventory.sort((a, b) =>
    a.name.localeCompare(b.name) || a.type.localeCompare(b.type)
  );

  useEffect(() => {
    if (inventory === initialInventory) return;
    saveInventory(inventory);
  }, [initialInventory, inventory]);

  return (
    <PageContainer>
      <Box display="flex" alignItems="center">
        <Brush sx={{ mr: 1.5, fontSize: 45 }} />

        <Typography variant="h3" sx={{ flex: 1 }}>
          Paint Inventory
        </Typography>

        <PaintFilters
          inventory={inventory}
          filter={filter}
          onChange={setFilter}
        />
      </Box>

      <Divider sx={{ mt: 6, mb: 6 }} />

      <Grid2 container spacing={10} width="100%" flex={1} overflow="hidden">
        <InventoryList
          filter={filter}
          inventory={sortedInventory}
          setInventory={setInventory}
        />
        
        <PinnedList
          inventory={sortedInventory}
          setInventory={setInventory}
        />
      </Grid2>
    </PageContainer>
  );
}
