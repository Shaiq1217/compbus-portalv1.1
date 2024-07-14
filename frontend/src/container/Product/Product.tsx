import { useRef } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './index.css'; // Import your custom scrollbar styles

interface FeaturedItemsProps<T> {
  data: T[];
  renderCard: (item: T) => React.ReactNode;
  title?: string;
  titleClassNames?: string;
}

const FeaturedItems = <T,>({ data, renderCard, title, titleClassNames }: FeaturedItemsProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Container className='p-1 custom-scrollbar'>
      <Grid container spacing={3} className="relative">
        <Grid item xs={12} className="flex items-center justify-center mb-1">
          {title && <Typography variant="h4" component="h2" gutterBottom className={titleClassNames}>
            {title}
          </Typography>}
        </Grid>
        <Grid item xs={1} className="flex items-center">
          <IconButton
            className="z-10"
            onClick={scrollLeft}
          >
            <ArrowBackIos />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <div ref={scrollRef} className="flex overflow-x-auto space-x-6 py-4 custom-scrollbar">
            {data.map((item, index) => (
              <div className="flex-shrink-0 w-60" key={index}>
                {renderCard(item)}
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={1} className="flex items-center justify-end">
          <IconButton
            className="z-10"
            onClick={scrollRight}
          >
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturedItems;
