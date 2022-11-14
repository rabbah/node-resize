const Jimp = require('jimp');

async function resizeImage(file) {
    const fileName = file
    let image = await Jimp.read(file);
    const resized = image.resize(150, 150);
    currentDate = `${Date.now()}`;
    let newPath = `processed/${fileName}_${currentDate}_150x150.png`;
    await image.writeAsync(newPath);
    return newPath
}

exports.resizeImage = resizeImage
