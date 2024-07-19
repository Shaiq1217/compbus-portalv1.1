import React, { useRef, useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface FeaturedItemsProps<T> {
  data: T[];
  renderCard: (item: T) => React.ReactNode;
  title?: string;
  titleClassNames?: string;
}

const FeaturedItems = <T,>({ data, renderCard, title, titleClassNames }: FeaturedItemsProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? data.length - 1 : prevIndex - 1;
        return newIndex;
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
        return newIndex;
      });
    }
  };

  return (
    <Box className='p-4 m-2 overflow-x-hidden'>
      <Grid container spacing={3} className="relative">
        <Grid item xs={12} className="flex items-center justify-center mb-1">
          {title && <Typography variant="h4" component="h2" gutterBottom className={titleClassNames} sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>}
        </Grid>
        <Grid item xs={1} className="flex items-center">
          <IconButton className="z-10" onClick={scrollLeft}>
            <ArrowBackIos />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <div ref={scrollRef} className="flex overflow-x-auto space-x-6 overflow-x-hidden">
            {data.map((item, index) => (
              <div className="flex-shrink-0 w-80" key={index}>
                {renderCard(item)}
              </div>
            ))}
          </div>
          {/* Pagination Dots */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            {data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: index === activeIndex ? '#000000' : '#cccccc',
                  marginX: '4px',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={1} className="flex items-center justify-end">
          <IconButton className="z-10" onClick={scrollRight}>
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedItems;
