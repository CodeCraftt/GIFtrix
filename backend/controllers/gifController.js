const multer = require('multer');
const Gif = require('../models/gifModel');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const path = require('path');

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

const storage = getStorage(firebaseApp);

// Multer config (store files in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Upload GIF to Firebase Storage
const uploadGifToFirebase = async (file) => {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.originalname}`;
  const storageRef = ref(storage, `gifs/${fileName}`);
  const metadata = { contentType: file.mimetype };

  await uploadBytes(storageRef, file.buffer, metadata);
  return getDownloadURL(storageRef);
};

// Upload GIF handler
const uploadGif = async (req, res) => {
  try {
    const { file, body } = req;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const gifUrl = await uploadGifToFirebase(file);
    const tags = (body.tags || '')
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean); // Remove empty strings

    const newGif = new Gif({ url: gifUrl, tags });
    const savedGif = await newGif.save();

    res.status(201).json(savedGif);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload GIF', error: error.message });
  }
};

// Search GIFs by tag
const searchGifs = async (req, res) => {
  try {
    const { tag, page = 1, limit = 10 } = req.query;
    if (!tag) return res.status(400).json({ message: 'Tag query is required' });

    const gifs = await Gif.find({ tags: tag.trim() })
      .sort({ share_count: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(gifs);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Failed to search GIFs', error: error.message });
  }
};

module.exports = { upload, uploadGif, searchGifs };
