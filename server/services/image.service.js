const {Image} = require('@/models/index');

const createImage = async (data) => {
  console.log("Creating image with data:", data);
  try {
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