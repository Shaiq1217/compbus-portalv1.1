import { Box, Button, Typography, useTheme, Grid, Container, AlertColor } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IProduct } from 'src/@types/shared';
import useGetQuery from 'src/api/get-query';
import ImageViewer from '../ImageViewer/ImageViewer';
import Spinner from '../Spinner/Spinner';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface ProductDetailProps {
    productDetail: IProduct;
    handleCartClick?: (action: any, item: IProduct) => void;
    handleBuyNowClick?: (action: any) => void;
}

interface DetailField {
    name: string;
    required: boolean;
    type: 'number' | 'string' | 'boolean';
    min?: number;
    max?: number;
}

const ProductDetail = ({ productDetail, handleBuyNowClick, handleCartClick }: ProductDetailProps) => {
    const theme = useTheme();
    const { data: details, isLoading, error } = useGetQuery<any, DetailField[]>('productDetail', productDetail._id);
    const [date, setDate] = useState<string | undefined>(undefined);
    const [discountedPrice, setDiscountedPrice] = useState<number | undefined>(undefined);
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

    useEffect(() => {
        if (productDetail.updatedAt) {
            const uploadedDate = new Date(productDetail.updatedAt);
            const formattedDate = uploadedDate.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            setDate(formattedDate);
        }
    }, [productDetail.updatedAt]);

    useEffect(() => {
        if (productDetail.discount !== undefined && productDetail.discount > 0) {
            const discountAmount = (productDetail.discount / 100) * productDetail.price!;
            const discountedPrice = productDetail.price! - discountAmount;
            setDiscountedPrice(discountedPrice);
        } else {
            setDiscountedPrice(undefined);
        }
    }, [productDetail.discount, productDetail.price]);

    const handleImageClick = () => {
        setIsImageViewerOpen(true);
    };

    const handleCloseImageViewer = () => {
        setIsImageViewerOpen(false);
    };

    return (
        <>
            <Grid container spacing={2} >
                <Container sx={{ display: 'flex', alignItems: 'center', marginTop: '3rem' }} >
                    <Grid item xs={12} md={6}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                src={productDetail.image}
                                alt={productDetail.name}
                                style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer', margin: 'auto' }}
                                onClick={handleImageClick}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" justifyContent="center" alignItems="flex-start" flexDirection="column" sx={{
                            marginInline: '2rem'
                        }}>
                            <Typography variant="h3" gutterBottom color={theme.palette.primary.main} fontWeight={theme.typography.fontWeightBold}>
                                {productDetail.name}
                            </Typography>
                            {productDetail.category && (
                                <Typography variant="body2" color={theme.palette.secondary.dark}>
                                    {productDetail.category.toUpperCase()}
                                </Typography>
                            )}
                            {discountedPrice !== undefined ? (
                                <>
                                    <Typography variant="h5" gutterBottom>
                                        <Box component="span" sx={{ fontSize: '2rem' }}>${discountedPrice.toFixed(2)}</Box> &nbsp;
                                        <Box component="span" sx={{ textDecoration: 'line-through', color: 'red' }}>
                                            ${productDetail.price}
                                        </Box>
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'red' }}>
                                        {productDetail.discount}% off
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h6" gutterBottom>
                                    ${productDetail.price}
                                </Typography>
                            )}

                            <Typography variant="body1" gutterBottom>
                                {productDetail.description}
                            </Typography>
                            {productDetail.quantity !== undefined && (
                                <Typography variant="body2" color="textSecondary">
                                    {productDetail.quantity} in stock
                                </Typography>
                            )}
                            {productDetail.updatedAt && (
                                <Typography variant="body2" color="textSecondary">
                                    Uploaded At: {date}
                                </Typography>
                            )}

                            {isLoading ? <Spinner /> : (details && (
                                <Box mt={2}>
                                    <Typography variant="h6" gutterBottom>
                                        Product Details:
                                    </Typography>
                                    {details.map((detail) => (
                                        <Typography key={detail.name} variant="body2" color="textSecondary">
                                            {detail.name}: {productDetail.detail[detail.name]}
                                        </Typography>
                                    ))}
                                </Box>
                            ))}
                            <Box display="flex" justifyContent="space-between" mt={4} width="100%">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<AddShoppingCartIcon />}
                                    sx={{ flex: 1, mr: 1, height: '3rem', width: 'calc(50% - 8px)' }}
                                    onClick={() => handleCartClick && handleCartClick({ message: 'Added to your cart', severity: 'success' }, productDetail)}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ShoppingCartIcon />}
                                    sx={{ flex: 1, ml: 1, height: '3rem', width: 'calc(50% - 8px)' }}
                                    onClick={() => handleBuyNowClick && handleBuyNowClick({ message: 'Buy Now', severity: 'success' })}

                                >
                                    Buy Now
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Container>
            </Grid>

            {isImageViewerOpen && (
                <ImageViewer
                    imageUrl={productDetail.image!}
                    onClose={handleCloseImageViewer}
                />
            )}
        </>
    );
};

export default ProductDetail;
