import { Box, Container, IconButton, Input, InputAdornment, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const InquirySection = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ marginInline: 'auto', width: '90%', display: 'flex', justifyContent: 'center', marginBlock: '2rem' }}>
      <Box
        sx={{
          width: '100%',
          padding: '5rem',
          display: 'flex',
          justifyContent: 'space-between', // Separate text and input to each end
          alignItems: 'center',
          height: '10vh',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText, // Adjust text color for contrast

        }}
      >
        <Box>
          <Typography variant='h4' sx={{ fontWeight: theme.typography.fontWeightLight }}>
            Send us an inquiry
          </Typography>
          <Typography variant='subtitle1' sx={{ fontWeight: theme.typography.fontWeightLight, color: 'rgba(255,255,255,0.7)' }}>
            Get a quote for your next project
          </Typography>
        </Box>
        <Input
          sx={{
            fontSize: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255)', // Transparent white background
            color: theme.palette.primary.main,
            padding: '1rem',
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.7)', // Placeholder text color
            },
            width: '60%'
          }}
          placeholder="Enter your email here"
          endAdornment={
            <InputAdornment position="end" >
              <IconButton
                size='large'
                aria-label="send inquiry"
              >
                <SendIcon sx={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Container>
  );
};

export default InquirySection;
