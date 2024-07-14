import { Grid } from "@mui/material";
import { ISectionCard } from "src/@types/shared";
import SectionCard from "src/components/SectionCard/SectionCard";
import './index.css'

interface SectionCardDisplayProps {
    sectionCards: ISectionCard[];
}

const SectionCardDisplay = ({ sectionCards }: SectionCardDisplayProps) => {
    return (
        <Grid container spacing={1} justifyContent="center" paddingInline={6}>
            {sectionCards.map((sectionCard, index) => (
                <Grid item key={index} xs={12} sm={10} md={6} lg={3} sx={{ marginBlock: '2rem' }}>
                    <SectionCard {...sectionCard} />
                </Grid>
            ))}
        </Grid>
    );
};

export default SectionCardDisplay;
