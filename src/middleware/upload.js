const multer = require('multer');

const upload = multer({
    // dest: 'avatar',
    limits : {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('You must upload an image!'))
        }
        cb(undefined, true)
        // cb(new Error('file must be a pdf'))
        // cb(undefined, true)
        // cb(undefined, false)   
    }
})

module.exports = upload