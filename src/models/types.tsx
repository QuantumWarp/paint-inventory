import { Air, Biotech, Contrast, DryCleaning, FormatPaint, Layers, Shower, Tonality } from "@mui/icons-material";
import { ReactNode } from "react";

export const commonTypes: Record<string, ReactNode> = {
  "Spray": <Shower />,
  "Base": <FormatPaint />,
  "Shade": <Tonality />,
  "Layer": <Layers />,
  "Technical": <Biotech />,
  "Contrast": <Contrast />,
  "Air": <Air />,
  "Dry": <DryCleaning />,
};
