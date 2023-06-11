const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const upload = multer({ dest: '/temp' });

router.get('/', (req, res) => {
  res.status(200).json({
    
  });
});

// upload photo using image url
router.post('/upload-by-link', async (req, res) => {
  // ...
});

// upload images from local device
router.post('/upload', upload.array('photos', 100), async (req, res) => {
  // ...
});

router.use('/myplaces', require('./myplaces'));
router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/bookings', require('./booking'));

module.exports = router;
