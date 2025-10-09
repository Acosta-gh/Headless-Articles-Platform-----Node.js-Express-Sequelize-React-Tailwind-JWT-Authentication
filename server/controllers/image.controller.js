const imageService = require("@/services/image.service");

async function getAllImages(req, res) {
  try {
    const images = await imageService.getAllImages();
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createImage(req, res) {
  try {
    console.log("File:", req.file);
    console.log("Body:", req.body);

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const { tempId } = req.body;
    if (!tempId) {
      return res.status(400).json({ error: "Missing tempId" });
    }

    // ✅ Usa filename si existe, o saca el nombre desde path
    const fileName = req.file.filename || req.file.path.split("/").pop();
    const imageUrl = `/uploads/${fileName}`;

    // Log de verificación
    console.log("Creando imagen con:", { tempId, url: imageUrl });

    // ✅ Crear registro
    const image = await imageService.createImage({
      tempId,
      url: imageUrl,
    });

    return res.status(201).json(image);
  } catch (error) {
    console.error("Error creando imagen:", error);
    return res.status(500).json({ error: error.message });
  }
}


module.exports = {
  createImage,
  getAllImages,
};
