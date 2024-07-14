import { Box, Container, Typography } from "@mui/material";
import { ReactNode } from "react"

interface SectionCardProps {
  Icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
}
const SectionCard = ({ Icon, title, subtitle, description }: SectionCardProps) => {
  return (
    <>
      <Container>
        <Box display={"flex"}>
          {Icon}
          <Box component='div'>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h6">{subtitle}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1">{description}</Typography>
        </Box>
      </Container>
    </>
  )
}

export default SectionCard