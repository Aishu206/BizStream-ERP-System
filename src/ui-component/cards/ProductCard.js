import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from '@/ui-component/cards/Skeleton/ProductPlaceholder';

// assets

// const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({
  id,
  name,
  productImageLink,
  offerPrice,
  salePrice,
  rating,
}) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const demo =
    'https://techerpbucket.s3.amazonaws.com/org/62c703c38406b2027c33a259/product/62d5a0099e79c636c5318931.jpeg?AWSAccessKeyId=AKIA4UN6W3RGD3IZHU4D&Expires=1658175712&Signature=zo2r7jm4irRdIJZouZs6gVp9bMA%3D';

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
          <div>
            <img src={productImageLink} alt='' />
          </div>
          <CardMedia
            sx={{ height: 220 }}
            image={productImageLink}
            title='Contemplative Reptile'
            component='img'
            //to={`/e-commerce/product-details/1`}
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
                      <Typography variant='h4'>${offerPrice}</Typography>
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
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
      <div>
        <img src={demo} height={100} width={100} alt='' />
      </div>
    </>
  );
};

// ProductCard.propTypes = {
//   id: PropTypes.string,
//   name: PropTypes.string,
//   // image: PropTypes.string,
//   description: PropTypes.string,
//   offerPrice: PropTypes.number,
//   salePrice: PropTypes.number,
// };

export default ProductCard;
