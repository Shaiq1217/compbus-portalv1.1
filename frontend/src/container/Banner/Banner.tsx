import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '70vh',
        overflow: 'hidden',
        marginBlock: '2rem',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        {/* Image Box */}
        <Box
          sx={{
            flex: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensure the image covers the entire container
              zIndex: 2,
            }}
            src="https://picsum.photos/id/48/5000/3333?blur=5"
          />
        </Box>

        {/* Text and Button Box */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white', // Semi-transparent background for text box
            textAlign: 'center',
            color: '#ffffff', // White text
            padding: '2rem',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              maxWidth: '80%',
            }}
          >
            <Box
              component="h2"
              sx={{
                fontSize: '4rem',

                color: 'black',
                marginBottom: '1rem',
              }}
            >
              Welcome to <br />
              <span style={{ fontWeight: 'bolder' }}>Compbus</span>

            </Box>
            <Button
              variant="contained"
              sx={{
                color: '#22333b', // White text
                height: '4rem',
                width: '12rem',
                backgroundColor: 'transparent',
                border: '1px solid #22333b',
                '&:hover': {
                  backgroundColor: '#22333b',
                  color: '#ffff', // Text color on hover
                },
              }}
            >
              <Typography>Let's Shop</Typography>
              <ArrowForward />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
