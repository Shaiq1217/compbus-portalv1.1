import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IProduct } from 'src/@types/shared';

interface ProductDetailProps {
    productDetail: IProduct;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productDetail }) => {
    const theme = useTheme();
    const [date, setDate] = useState<string | undefined>(undefined);
    const [discountedPrice, setDiscountedPrice] = useState<number | undefined>(undefined);

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

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
            <Box>
                <img
                    src={productDetail.image}
                    alt={productDetail.name}
                    style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                />
            </Box>
            <Box ml={4} maxWidth="600px">
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
                            <Box component="span" sx={{ textDecoration: 'line-through', color: productDetail.discount ? 'red' : 'black' }}>
                                ${productDetail.price}
                            </Box>
                            &nbsp; ${discountedPrice.toFixed(2)}
                        </Typography>
                        {productDetail.discount !== undefined && productDetail.discount > 0 && (
                            <Typography variant="h5" color="error">
                                {productDetail.discount}% off
                            </Typography>
                        )}
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

            </Box>
        </Box>
    );
};

export default ProductDetail;
