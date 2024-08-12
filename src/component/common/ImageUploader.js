import { useState } from 'react';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { Avatar, Button, Grid, Typography } from '@mui/material';

import User1 from '../../assets/images/file.png';
import { gridSpacing } from '@/store/constant';
const ImageUploader = ({ parentImageSet, fieldLabel, field, accept }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    parentImageSet(file);
  };
  return (
    <Grid item xs={12}>
      <Grid container alignItems='center' spacing={gridSpacing}>
        {!imagePreview && (
          <Grid item>
            <Avatar alt='User 3' src={User1} sx={{ width: 64, height: 64 }} />
          </Grid>
        )}
        <Grid item xs>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <label htmlFor='containedButtonFile'>
                <input
                  onChange={handleUploadClick}
                  accept={accept}
                  style={{
                    opacity: 0,
                    position: 'fixed',
                    zIndex: 1,
                    padding: 0.5,
                    cursor: 'pointer',
                  }}
                  id='containedButtonFile'
                  type='file'
                />
                <Button
                  variant='outlined'
                  size='large'
                  startIcon={<UploadTwoToneIcon />}>
                  Upload Image
                </Button>
              </label>
              <br />
              <Grid container style={{ marginTop: '2%' }}>
                {imagePreview && (
                  <img
                    src={imagePreview !== null ? imagePreview : ''}
                    alt='File is Selected'
                    height={'15%'}
                    width={'20%'}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='caption'>
                Image size should be 125kb Max.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ImageUploader;
