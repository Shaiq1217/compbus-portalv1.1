import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { IProduct } from '../../types/product';
import { useTheme } from '@emotion/react';

interface ProductCardProps {
  product: IProduct
  imageHeight?: string
  cardHeight?: string;
}

const ProductCard = ({ product, imageHeight, cardHeight }: ProductCardProps) => {
  const theme = useTheme();
  const handleProductPage = (productId: string) => {
    console.log('Product page', productId)
  }
  return (
    <Card className={`cursor-pointer hover:shadow-lg transition-shadow duration-300 h-[${cardHeight ?? '450px'}] `} onClick={() => handleProductPage(product._id!)}>
      <CardMedia
        component="img"
        height={imageHeight || '300px'}
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Box className='flex justify-between items-center mb-3'>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(0,0,0,0)' }}>
            ${product.price}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.quantity ? `${product.quantity} left` : 'Out of stock'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {product.tags?.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
