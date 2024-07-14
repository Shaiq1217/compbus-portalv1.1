import { Box, Container, Typography } from "@mui/material";
import { ComponentType } from "react";
import { ISectionCard } from "src/@types/shared";
import './index.css'

interface SectionCardProps extends ISectionCard { }

const SectionCard = ({ Icon, title, subtitle, description }: SectionCardProps) => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        width="auto"
        height="200px"
        p={2}
        className="border rounded-xl border-[#22333b29]"
      >
        <Box display="flex" alignItems="center" mb={1} p={1} >
          <Icon sx={{ color: "#22333b" }} fontSize="large" />
          <Box ml={2}>
            <Typography variant="h5" color={"#22333b"} sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(0,0,0,0.5)' }}>{subtitle}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1">{description}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionCard;
