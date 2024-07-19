import React, { useState } from 'react';
import { Box, Button, Container, IconButton, Typography, useTheme } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const testimonials = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies sollicitudin nulla, eget convallis felis volutpat nec.",
        author: "John Doe",
        position: "CEO, Company A",
        rating: 3 // Initial rating example
    },
    {
        id: 2,
        text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis metus nec eros ultrices rhoncus.",
        author: "Jane Smith",
        position: "Marketing Manager, Company B",
        rating: 4 // Initial rating example
    },
    {
        id: 3,
        text: "Aliquam erat volutpat. Donec tincidunt ex in lectus viverra, a congue eros convallis. Duis id odio eu nisi eleifend eleifend.",
        author: "Michael Johnson",
        position: "CTO, Company C",
        rating: 5 // Initial rating example
    }
];

const Testimonials = () => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    const handlePrev = () => {
        setFadeOut(true);
        setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
            setFadeOut(false);
        }, 500); // Wait for 500ms for fade-out transition
    };

    const handleNext = () => {
        setFadeOut(true);
        setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
            setFadeOut(false);
        }, 500); // Wait for 500ms for fade-out transition
    };

    return (
        <Container sx={{ paddingY: '3rem' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.background.paper,
                    padding: '2rem',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        opacity: fadeOut ? 0 : 1,
                        transition: 'opacity 0.5s ease',
                        textAlign: 'center',
                        paddingTop: '2rem',
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                        {testimonials[activeIndex].text}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        {testimonials[activeIndex].author}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, marginBottom: '1rem' }}>
                        {testimonials[activeIndex].position}
                    </Typography>
                </Box>
                {/* Star Ratings */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        opacity: fadeOut ? 0 : 1,
                        transition: 'opacity 0.5s ease',
                    }}
                >
                    {[...Array(testimonials[activeIndex].rating)].map((_, index) => (
                        <StarIcon
                            key={index}
                            sx={{
                                color: theme.palette.secondary.main,
                                marginRight: '4px',
                                transition: 'color 0.3s ease',
                            }}
                        />
                    ))}
                    {[...Array(5 - testimonials[activeIndex].rating)].map((_, index) => (
                        <StarBorderIcon
                            key={index}
                            sx={{
                                color: '#cccccc',
                                marginRight: '4px',
                                transition: 'color 0.3s ease',
                            }}
                        />
                    ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button onClick={handlePrev} sx={{ marginRight: '1rem', borderRadius: '50%', minWidth: 0 }}>
                        <NavigateBeforeIcon sx={{ fontSize: 32 }} />
                    </Button>
                    <Button onClick={handleNext} sx={{ borderRadius: '50%', minWidth: 0 }}>
                        <NavigateNextIcon sx={{ fontSize: 32 }} />
                    </Button>
                </Box>

                {/* Pagination Dots */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    {testimonials.map((testimonial, index) => (
                        <Box
                            key={testimonial.id}
                            sx={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: index === activeIndex ? theme.palette.secondary.main : '#cccccc',
                                marginX: '4px',
                                transition: 'background-color 0.3s ease',
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default Testimonials;
