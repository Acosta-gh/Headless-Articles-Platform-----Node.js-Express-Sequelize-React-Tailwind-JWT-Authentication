const {Image} = require('@/models/index');

const createImage = async (data) => {
  try {
    console.log("Creating image with data:", data);
    const image = await Image.create(data);
    return image;
  } catch (error) {
    throw new Error("Error creating image: " + error.message);
  }
};

const getAllImages = async () => {
  try {
    const images = await Image.findAll();
    return images;
  } catch (error) {
    throw new Error("Error fetching images: " + error.message);
  }
};

module.exports = {
  createImage,
  getAllImages,
};