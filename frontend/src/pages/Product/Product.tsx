import React from 'react';
import useGetQuery from '../../api/get-query';
import Spinner from '../../components/Spinner/Spinner';
import { IProduct } from '../../types/product';
import { IResponse } from '../../types/shared';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const Product = () => {
  const { data: products, isLoading } = useGetQuery<IProduct[], IProduct[]>('product');
  console.log(products);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          {products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} >
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.quantity ? `${product.quantity} left` : 'Out of stock'}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {product.tags?.join(', ')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Product;
