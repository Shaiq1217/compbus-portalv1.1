import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { IProduct } from '../../@types/shared/product';


interface ProductCardProps {
  product: IProduct
  imageHeight?: string
  cardHeight?: string;
  setProductId: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ProductCard = ({ product, imageHeight, cardHeight, setProductId }: ProductCardProps) => {
  const theme = useTheme();

  const handleProductPage = (productId: string) => {
    setProductId(productId);
  }
  return (
    <Card className={`cursor-pointer hover:shadow-lg transition-shadow duration-300 h-[${cardHeight ?? '450px'}] `} onClick={() => handleProductPage(product._id!)}>
      <CardMedia
        component="img"
        height={imageHeight || '400px'}
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Box className='flex justify-between items-center mb-3'>
          <Typography variant="h6" component="div" color={theme.palette.primary.main} fontWeight={'bold'}>
            {product.name}
          </Typography>
          <Typography variant="h6" color={theme.palette.primary.main}>
            ${product.price}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {product.quantity ? `${product.quantity} left` : 'Out of stock'}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default ProductCard;
