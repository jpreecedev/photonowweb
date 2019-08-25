import express from 'express'
import uuid from 'uuid/v4'
import { FaceController } from '../controllers'
import { s3Upload, authorisation } from '../utils'

const router = express.Router()

router.post(
  '/',
  authorisation.basic,
  s3Upload.uploadFromClient(
    false,
    file => ({ filename: file.originalname }),
    file => `${uuid()}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`
  ),
  FaceController.post
)

export default router
