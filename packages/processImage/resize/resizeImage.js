const Jimp = require('jimp');

async function resizeImage(file) {
    let image = await Jimp.read(file);

    image.resize(150, 150);
    let processed = await image.writeAsync(`./processed/${file}`)
    let newPath = `/processed/${file}`
    console.log("this is the new path", newPath);
    return newPath
}

exports.resizeImage = resizeImage