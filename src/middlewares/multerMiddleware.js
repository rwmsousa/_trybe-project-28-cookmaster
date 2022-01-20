const multer = require('multer'); // import multer module from nodejs to upload files
const path = require('path'); // import path from nodejs

const storage = multer.diskStorage({ // create a storage to save the files
    destination: (req, file, callback) => // set the destination of the files
        callback(null, path.resolve(__dirname, '..', 'uploads')), 
    filename: (req, file, callback) => callback(null, `${req.params.id}.jpeg`), // set the name of the files
});

// Alternatively, you can specify other name fomat to file.    
// filename: (req, file, callback) => callback(null, `${ Date.now() } - ${ file.originalname }`)

const upload = multer({ storage }); // create a multer instance to upload the files

module.exports = upload.single('image'); // export the upload instance