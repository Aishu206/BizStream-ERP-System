import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const ImageViewerModal = ({ imageUrl, open, handleClose }) => {
  console.log("imageUrl:", imageUrl); // Log the imageUrl

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { p: 0 } }}
    >
      <DialogTitle> Image</DialogTitle>
      <DialogContent>
        {imageUrl && (
          <img src={imageUrl} alt='Image' style={{ maxWidth: "100%" }} />
        )}
      </DialogContent>
    </Dialog>
  );
};

ImageViewerModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ImageViewerModal;
