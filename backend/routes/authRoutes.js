const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const cloudinaryUpload = require('../middlewares/cloudinaryUpload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

router.post("/upload-image", cloudinaryUpload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  
  try {
    // Convert buffer to data URI
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: 'job-portal',
    });
    
    // Return the Cloudinary URL
    const imageUrl = result.secure_url;
    
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

module.exports = router;
