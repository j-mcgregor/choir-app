const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const path = require('path');
const keys = require('../../config/keys');

const parseToken = token => jwt.verify(token.replace(/^JWT\s/, ''), keys.secretOrKey);

const handleExpire = (req, res) => {
  try {
    const realToken = parseToken(req.headers.authorization);
    return realToken;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      //handle expire

      res.status(401).json({ errors: 'Token expired' });
    } else if (err.name === 'TypeError') {
      //handle no-token

      res.status(401).json({ errors: 'No token' });
    } else {
      res.status(401).json({ errors: 'Something went wrong..' });
    }
    console.log(err);
    return '';
  }
};

const mongoURI = require('../../config/keys').mongoURI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

//define storage
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;

        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: {
            description: req.headers.uploaddescription,
            trackType: req.headers.tracktype
          }
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

/**
 @route POST /files/upload
 @desc UPLOAD FILE
 @access Private
 */

router.post('/upload', upload.any(), (req, res) => {
  if (handleExpire(req, res)) {
    res.json({ msg: 'success' });
  }
});

/**
 @route GET /files/all
 @desc GET ALL FILES
 @access Public
 */

router.get('/all', async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    if (!files) throw Error('Broken');

    res.status(200).json(files);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

/**
 @route GET /download/:id
 @desc DOWNLOAD
 @access Public
 */

router.get('/download/:id', async (req, res) => {
  gfs.collection('uploads');
  if (!req.params.id) res.status(400).json({ error: 'ID missing' });

  try {
    const file = await gfs.files.findOne({ _id: new ObjectId(req.params.id) });
    if (!file) throw Error('No File');

    const readstream = gfs.createReadStream({
      _id: file._id,
      root: 'uploads'
    });

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `attachment; filename="${encodeURIComponent(file.filename)}"`);

    readstream.on('error', err => {
      console.log(err);
      res.end();
    });
    return readstream.pipe(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  gfs.files.findOne({ _id: new ObjectId(req.params.id) }, (err, file) => {
    if (err) res.status(400).send(err);
    if (!file) res.status(404).send(err);

    const readstream = gfs.createReadStream({
      _id: file._id,
      root: 'uploads'
    });

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `attachment; filename="${encodeURIComponent(file.filename)}"`);
    readstream.on('error', err => {
      console.log(err);
      res.end();
    });
    return readstream.pipe(res);
  });
});

/**
 @route GET /stream/:id
 @desc DOWNLOAD / STREAM
 @access Public
 */

router.get('/stream/:id', async (req, res) => {
  gfs.collection('uploads'); //set collection name to lookup into

  if (!req.params.id) res.status(400).json({ error: 'ID missing' });

  try {
    const files = await gfs.files.find({ _id: new ObjectId(req.params.id) }).toArray();
    if (!files || files.length === 0) throw Error('file not found');

    // create read stream
    const readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: 'uploads'
    });

    res.set('Content-Type', files[0].contentType);
    res.set('Content-Disposition', `attachment; filename="${encodeURIComponent(files[0].filename)}"`);

    // return res
    return readstream.pipe(res);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/delete', async (req, res) => {
  // if (handleExpire(req, res)) {
  try {
    const success = await gfs.remove({
      _id: req.body.id,
      root: 'uploads'
    });

    if (!success) throw Error();
    res.status(204).json({ message: 'Track deleted successfully' });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = router;
