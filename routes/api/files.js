const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const multerGridFS = require('multer-gridfs-storage');
const gridFsStream = require('gridfs-stream');
const crypto = require('crypto');
const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const path = require('path');
const keys = require('../../config/keys');

const parseToken = token =>
  jwt.verify(token.replace(/^JWT\s/, ''), keys.secretOrKey);

const handleExpire = (request, response) => {
  try {
    const realToken = parseToken(request.headers.authorization);
    return realToken;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      //handle expire

      response.status(401).json({ errors: 'Token expired' });
    } else if (err.name === 'TypeError') {
      //handle no-token

      response.status(401).json({ errors: 'No token' });
    } else {
      response.status(401).json({ errors: 'Something went wrong..' });
    }
    console.log(err);
    return '';
  }
};

let gfs;
const mongoURI = require('../../config/keys').mongoURI;
mongoose
  .createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(conn => {
    gfs = gridFsStream(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('Made connection to mongo!');
  });

//define storage
const storage = new multerGridFS({
  url: mongoURI,
  file: (req, file) => {
    console.log('[File]', file);
    return new Promise((resolve, reject) => {
      if (!parseToken(req.headers.authorization)) reject('Couldnt parse token'); //authorization
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname); //given up on that one...
        console.log('[Filename]:', filename);
        const fileInfo = {
          filename: file.originalname,
          bucketName: 'uploads',
          metadata: {
            uploaderId: parseToken(req.headers.authorization)._id,
            uploadDescription: req.headers.uploaddescription
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

router.post('/upload', upload.any(), (request, response) => {
  console.log('[Upload post request body]', request.headers, request.body);

  if (handleExpire(request, response)) {
    response.json({ msg: 'success' });
  }
});

/**
 @route GET /files/all
 @desc GET ALL FILES
 @access Public
 */

router.get('/all', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(200).json({
        err: 'No files exist'
      });
    } else {
      return res.status(200).json(files);
    }
  });
});

/**
 @route GET /download/:id
 @desc DOWNLOAD / STREAM
 @access Public
 */

router.get('/download/:id', (req, res) => {
  gfs.collection('uploads'); //set collection name to lookup into

  const fileId = req.params.id;

  gfs.files.find({ _id: new ObjectId(fileId) }).toArray((err, files) => {
    console.log(files.length);

    /** First check if file exists */
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: 'file not found'
      });
    }

    // create read stream
    const readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: 'uploads'
    });

    // set the proper content type
    res.set('Content-Type', files[0].contentType);
    res.set(
      'Content-Disposition',
      'attachment; filename="' + encodeURIComponent(files[0].filename) + '"'
    );

    // return response
    return readstream.pipe(res);
  });
});

module.exports = router;
