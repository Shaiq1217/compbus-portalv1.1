import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface BannerProps {
  invert?: boolean;
  textColor?: string;
  buttonText?: string;
  buttonVisible?: boolean;
  totalHeight?: string;
  imageUrl?: string;
  customButtonStyle?: any;
  Icon?: React.ComponentType<any>; // Ensure Icon is a valid React component type
  titleNode?: ReactNode;
  description?: ReactNode;
  descriptionStyles?: any;
}

const Banner = ({
  invert = false,
  textColor = 'black',
  buttonText = "Let's Shop",
  buttonVisible = true,
  totalHeight = '70vh',
  customButtonStyle,
  imageUrl = 'https://picsum.photos/id/48/5000/3333?blur=10',
  Icon = ArrowForward,
  titleNode,
  descriptionStyles,
  description,
}: BannerProps) => {
  const buttonStyles = customButtonStyle ? customButtonStyle : {
    height: '4rem',
    width: '20rem',
    backgroundColor: '#22333b',
    color: '#ffff',
    '&:hover': {
      color: '#22333b',
      backgroundColor: 'transparent',
      border: '1px solid #22333b',
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: totalHeight,
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
          flexDirection: invert ? 'row-reverse' : 'row',
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
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(${invert ? 'to right' : 'to left'}, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 40%), url(${imageUrl})`,
              backgroundSize: 'cover',
              zIndex: 1,
              transition: 'opacity 0.5s ease',
            },
          }}
        >
          {/* Empty Box for gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
            }}
          />
        </Box>

        {/* Text and Button Box */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            textAlign: 'center',
            color: textColor,
            padding: '2rem',
            zIndex: 2,
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
                marginBottom: '1rem',
              }}
            >
              {titleNode}
              {description && <Typography variant="h2" component="h2" gutterBottom sx={descriptionStyles}>
                {description}
              </Typography>}
            </Box>

            {buttonVisible && (
              <Button variant="contained" sx={buttonStyles}>
                <Typography>{buttonText}</Typography>
                <Icon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
