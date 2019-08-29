import express from 'express'
import multer from 'multer'
import { faceRecognition } from '../utils'

const router = express.Router()
const upload = multer()

router.post('/', upload.single('photo'), async (req: RequestWithFile, res, next) => {
  const response = await faceRecognition.verifyFace(req.file.buffer)
  if (response) {
    const recogniseFromBuffer = await faceRecognition.recogniseFromBuffer(req.file.buffer)

    return res.status(200).json(recogniseFromBuffer)
  }
  return res.status(500).json({})
})

export default router
