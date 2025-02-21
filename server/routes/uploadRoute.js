import path from 'path'
import express from 'express'
import multer from 'multer'

export const uploadRouter = express.Router()

// setting name of the uploaded image
const storage = multer.diskStorage({
  destination: 'uploads/',  
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

// accept only the indicated image format
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  if (allowedTypes.test(path.extname(file.originalname).toLowerCase()) && 
      allowedTypes.test(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPEG, JPG, PNG, WEBP images are Uploaded!'), false)
  }
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

// process the upload of the image
uploadRouter.post('/', (req, res) => {
  uploadSingleImage(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error.message })
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No Image Provided!' })
    }
    res.status(200).json({
      message: 'Image Uploaded Successfully!',
      image: `/uploads/${req.file.filename}`,
    })
  })
})
