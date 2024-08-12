import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { CardContent, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from '@/ui-component/cards/MainCard';
import SkeletonProductPlaceholder from '@/ui-component/cards/Skeleton/ProductPlaceholder';
import FileViewer from '@/utils/FileViewer';

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({
  id,
  name,
  productImageLink,
  offerPrice,
  salePrice,
  quantity,
}) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const height = 420;

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            '&:hover': {
              transform: 'scale3d(1.02, 1.02, 1)',
              transition: 'all .4s ease-in-out',
            },
          }}>
          <FileViewer
            productUrl={productImageLink}
            height={height}
            name={name}
            to={`/product/product-details/${id}`}
          />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component={Link}
                  to={`/e-commerce/product-details/1`}
                  variant='subtitle1'
                  sx={{ textDecoration: 'none' }}>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography variant='h4'>₹{offerPrice}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant='h6'
                        sx={{
                          color: 'grey.500',
                          textDecoration: 'line-through',
                        }}>
                        ${salePrice}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant='h4'
                        sx={{
                          color: 'grey.500',
                        }}>
                        Qty : {quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  offerPrice: PropTypes.number,
  salePrice: PropTypes.number,
};

export default ProductCard;
