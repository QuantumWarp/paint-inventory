import { Box } from "@mui/material";
import { ReactNode } from "react"
import { PageFooter } from "./PageFooter";

type PageContainerProps = {
  maxWidth?: number;
  children: ReactNode;
}

export function PageContainer({ children, maxWidth = 1200 }: PageContainerProps) {
  return (
    <Box p={2} pt={4} display="flex" flexDirection="column" alignItems="center" height="100vh">
      <Box flex={1} maxWidth={maxWidth} width="100%" display="flex" flexDirection="column" overflow="hidden">
        {children}
      </Box>
      
      <PageFooter />
    </Box>
  )
}
