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
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
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
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tags: {product.tags?.join(', ')}
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
