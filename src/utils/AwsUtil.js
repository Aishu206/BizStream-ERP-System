import AWS from 'aws-sdk';
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_ID,
  AWS_REGION,
  AWS_ACCESS_KEY,
} from '../bckend';

export const getProductByUrl = (productUrl) => {
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_ACCESS_KEY,
    region: AWS_REGION,
  });
  const params = { Bucket: AWS_BUCKET_NAME, Key: productUrl };
  s3.getSignedUrl('getObject', params, function (err, url) {
    return '' + url;
  });
};
