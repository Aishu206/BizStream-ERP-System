import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// material-ui
import { CardContent, Grid, Stack, Typography } from "@mui/material";

// project import
import SkeletonProductPlaceholder from "@/ui-component/cards/Skeleton/ProductPlaceholder";
import FileViewer from "@/utils/FileViewer";
import MainCard from "@/ui-component/cards/MainCard";

// ==============================|| PRODUCT CARD ||============================== //

const MaterialCard = ({
  id,
  materialImageLink,
  name,
  description,
  price,
  quantity,
  unitType,
  category,
}) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const height = 300;

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            "&:hover": {
              transform: "scale3d(1.02, 1.02, 1)",
              transition: "all .4s ease-in-out",
            },
          }}
        >
          <FileViewer
            productUrl={materialImageLink}
            name={name}
            height={height}
            to={`/material/material-details/${id}`}
          />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component={Link}
                  to={`/e-commerce/product-details/1`}
                  variant="subtitle1"
                  sx={{ textDecoration: "none" }}
                >
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography variant="h4">₹{price}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "grey.500",
                        }}
                      >
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

MaterialCard.propTypes = {
  id: PropTypes.number,
  materialImageLink: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  unitType: PropTypes.string,
  category: PropTypes.string,
};

export default MaterialCard;
