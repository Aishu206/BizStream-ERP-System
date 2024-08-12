// FileViewer.js

import { useState, useEffect } from "react";
import { CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AWS from "aws-sdk";
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_ID,
  AWS_REGION,
  AWS_ACCESS_KEY,
} from "@/backend";

const FileViewer = ({ productUrl, name, height, to, onClick }) => {
  const [s3FilePath, setS3FilePath] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const url = await getSignedUrl(productUrl);
        setS3FilePath(url);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, [productUrl]);

  const getSignedUrl = async (path) => {
    const s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_ID,
      secretAccessKey: AWS_ACCESS_KEY,
      region: AWS_REGION,
    });

    const params = { Bucket: AWS_BUCKET_NAME, Key: path };

    return new Promise((resolve, reject) => {
      s3.getSignedUrl("getObject", params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  };

  return (
    <CardMedia
      sx={{ height: height }}
      image={s3FilePath}
      title={name}
      component={Link}
      to={to}
      onClick={onClick}
    />
  );
};

FileViewer.propTypes = {
  productUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FileViewer;
