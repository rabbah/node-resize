const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
require('dotenv').config();

const SPACES_ENDPOINT = process.env['SPACES_ENDPOINT'];
const SPACES_NAME = process.env['SPACES_NAME'];
const SPACES_KEY = process.env['SPACES_KEY'];
const SPACES_SECRET = process.env['SPACES_SECRET'];

const s3 = new AWS.S3({
  endpoint: SPACES_ENDPOINT,
  accessKeyId: SPACES_KEY,
  secretAccessKey: SPACES_SECRET
})

async function spacesUpload(filePath) {
  let file = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  const options = {
    Bucket: SPACES_NAME,
    Body: file,
    Key: `videos/${filename}`,
    ACL: "public-read",
  }
  return await s3.upload(options).promise();
}

exports.spacesUpload = spacesUpload;