import { Box, Container, Grid, IconButton, Typography, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: '#ffffff',
                padding: '3rem 0',
            }}
        >
            <Container>
                <Grid container spacing={8} sx={{ marginBottom: '2rem' }}>
                    {/* Left Column for 'Compbus' */}
                    <Grid item xs={12} md={3}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                            Compbus
                        </Typography>
                    </Grid>

                    {/* Right Column for Content */}
                    <Grid item xs={12} md={9}>
                        {/* Social Media Icons */}
                        <Grid container spacing={2}>
                            <Grid item>
                                <IconButton aria-label="Facebook" sx={{ color: '#ffffff' }}>
                                    <FacebookIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="Twitter" sx={{ color: '#ffffff' }}>
                                    <TwitterIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="Instagram" sx={{ color: '#ffffff' }}>
                                    <InstagramIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="LinkedIn" sx={{ color: '#ffffff' }}>
                                    <LinkedInIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        {/* Quick Links */}
                        <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
                            <Grid item xs={6} md={3}>
                                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Quick Links
                                </Typography>
                                <Typography variant="body2">
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        <li>About Us</li>
                                        <li>Services</li>
                                        <li>Contact Us</li>
                                    </ul>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Random Contact Details
                                </Typography>
                                <Typography variant="body2">
                                    Address: 123 Main St, City, Country <br />
                                    Email: contact@example.com <br />
                                    Phone: +1234567890
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Copyright Info */}
                        <Typography variant="body2" sx={{ opacity: 0.5, marginBottom: '1rem' }}>
                            &copy; 2024 Your Company Name. All Rights Reserved.
                        </Typography>

                        {/* Shipment Partners and Payment Partners */}
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Shipment Partners
                                </Typography>
                                <Typography variant="body2">
                                    <LocalShippingIcon /> Shipper A <br />
                                    <LocalShippingIcon /> Shipper B
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Payment Partners
                                </Typography>
                                <Typography variant="body2">
                                    <PaymentIcon /> PayPal <br />
                                    <PaymentIcon /> Stripe
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
