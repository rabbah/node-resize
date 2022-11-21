const { resizeImage } = require('./resizeImage');
const { readMultipart } = require('./readMultipart');
const { spacesUpload } = require('./spacesUpload');

async function main(args) {
  try {
    console.log("this is args", args);
    const parts = await readMultipart(args);
    const image = await resizeImage(parts.file);
    const data = await spacesUpload(image);
    return {
      body: data
    }
  } catch (error) {
    return {
      body: {
        error: error
      }
    }
  }
}

exports.main = main;