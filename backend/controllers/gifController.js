const multer = require('multer');
const Gif = require('../models/gifModel');
const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const path = require('path');
// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Configure multer (store file in memory)
const multerStorage = multer.memoryStorage(); 
const upload = multer({ storage: multerStorage });

// Function to upload GIF to Firebase Storage
const uploadGifToFirebase = async (file) => {
  const destination = `gifs/${Date.now()}_${file.originalname}`;
  const storageRef = ref(storage, destination);

  const metadata = {
    contentType: file.mimetype,
  };

  await uploadBytes(storageRef, file.buffer, metadata);
  const publicUrl = await getDownloadURL(storageRef);

  return publicUrl;
};

// Upload GIF and save URL in MongoDB
const uploadGif = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    // Upload to Firebase and get the URL
    const gifUrl = await uploadGifToFirebase(file);

    const newGif = new Gif({
      url: gifUrl,
      tags: req.body.tags.split(','),
    });

    const savedGif = await newGif.save();
    res.status(201).json(savedGif);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search GIFs by tags
const searchGifs = async (req, res) => {
  try {
    const { tag } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const gifs = await Gif.find({ tags: { $in: [tag] } })
      .sort({ share_count: -1, createdAt: -1 }) // Sort by share_count, then by recency
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(gifs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { upload, uploadGif, searchGifs };
