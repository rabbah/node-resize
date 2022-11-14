const Multipart = require('parted').multipart;
const { Readable } = require('stream');

function readMultipart(args) {
  const fileBuffer = new Buffer.from(args.__ow_body, 'base64');
  let stream = Readable.from(fileBuffer);

  return new Promise((resolve, reject) => {

    let parser = new Multipart(
      args.__ow_headers['content-type'],
      {
        limit: 30 * 1024,
        diskLimit: 30 * 1024 * 1024
      }
    );
    let parts = {};
    
    parser.on('error', function (err) {
      reject('error reading parts: ', err.message)
    });

    parser.on('part', function (field, part) {
      parts[field] = part;
    });

    parser.on('end', function () {
      resolve(parts)
    });

    stream.pipe(parser);
  })
}

exports.readMultipart = readMultipart