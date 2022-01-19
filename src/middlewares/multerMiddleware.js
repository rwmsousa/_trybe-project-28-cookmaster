// const express = require('express')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'src/uploads/'),
    filename: (req, file, callback) => callback(null, `${ req.params.id }.jpeg`)
    // filename: (req, file, callback) => callback(null, `${ Date.now() } - ${ file.originalname }`)
});

const upload = multer({ storage });

module.exports = upload.single('image');