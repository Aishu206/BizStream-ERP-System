import { useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from '@/store/constant';
import { IconEdit } from '@tabler/icons-react';

const ProductImageUploader = ({
  parentImageSet,
  fieldLabel,
  field,
  accept,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    parentImageSet(file);
  };
  return (
    <Grid item xs={12}>
      <Grid container alignItems='center' spacing={gridSpacing}>
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
                <IconEdit stroke={2} size='2rem' />
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProductImageUploader;
