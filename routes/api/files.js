const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const gridFsStream = require('gridfs-stream');
const ObjectId = require('mongodb').ObjectID;

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
