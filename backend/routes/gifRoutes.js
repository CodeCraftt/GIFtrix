const express = require('express');
const Gif =require('../models/gifModel.js')
const { upload, uploadGif, searchGifs } = require('../controllers/gifController');

const router = express.Router();

// Route to upload a GIF
router.post('/upload', upload.single('gif'), uploadGif);

// Route to search GIFs by tags
router.get('/search', searchGifs);



router.post('/:id/share', async (req, res) => {
    try {
        
      const gif = await Gif.findById(req.params.id);
      
      
      if (!gif) return res.status(404).json({ message: 'GIF not found' });
  
      gif.share_count = (gif.share_count || 0) + 1;
      await gif.save();
  
      res.status(200).json({ message: 'GIF shared successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
