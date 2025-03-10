import { DarkMode, HelpOutline, LightMode, Download, Upload } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Tooltip, Typography, useColorScheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { backup, restore } from "../storage/backup-restore";

export function PageFooter() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, setMode, systemMode } = useColorScheme();
  const color = mode === "system" ? systemMode : mode;
  const year = new Date().getFullYear();
  const [openAbout, setOpenAbout] = useState(false);

  const updateMode = () => {
    const nextColor = color !== 'dark' ? 'dark' : 'light';
    const nextMode = (prefersDarkMode && nextColor === "dark") ? "system" : nextColor;
    setMode(nextMode);
  };

  return (
    <Box mt={2} p={2} display="flex" alignItems="center" flexDirection="column" sx={{ opacity: 0.7 }}>
      <Box mb={1}>
        <Tooltip title="About this app" placement="top">
          <IconButton onClick={() => setOpenAbout(true)}>
            <HelpOutline />
          </IconButton>
        </Tooltip>

        <Tooltip title={color !== 'dark' ? "Dark mode" : "Light mode"} placement="top">
          <IconButton onClick={updateMode}>
            {color === 'dark' && <LightMode />}
            {color !== 'dark' && <DarkMode />}
          </IconButton>
        </Tooltip>
      
        <Tooltip title="Backup" placement="top">
          <IconButton onClick={() => backup()}>
            <Download />
          </IconButton>
        </Tooltip>

        <Tooltip title="Restore from backup" placement="top">
          <IconButton component="label">
            <Upload />
            <input
              style={{ display: "none" }}
              accept="application/json"
              type="file"
              onChange={async (event) => {
                const selectedFile = event.target.files?.[0];
                if (!selectedFile) return;
                restore(selectedFile);
                location.reload();
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={openAbout}>
        <DialogTitle>About</DialogTitle>

        <DialogContent>
          <Typography mb={2}>
            A simple app to list your collection of paints to be able to select what you need before having to search to find them.
          </Typography>
          <Typography>
            To see more technical information about this app check out
            the <Link href="https://github.com/QuantumWarp/paint-inventory">Github repo</Link>.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAbout(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="body2">
        Copyright © {year}
      </Typography>
    </Box>
  );
}