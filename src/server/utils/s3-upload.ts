import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3-transform'
import sharp from 'sharp'
import { join } from 'path'

const watermark = join(__dirname, '../../../assets/watermark.png')

const BUCKET = process.env.AWS_BUCKET

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const upload = (resize, setMetadata, setKey) => {
  const multerMetadata = {
    metadata: (_req, file, cb) => {
      cb(null, setMetadata(file))
    },
    key: (_req, file, cb) => {
      cb(null, setKey(file))
    },
    transform: (_req, _file, cb) => cb(null, sharp())
  }

  const transforms = [
    {
      id: 'original',
      ...multerMetadata
    }
  ]

  if (resize) {
    transforms.push({
      id: 'resized',
      ...multerMetadata,
      transform: (_req, _file, cb) => {
        cb(
          null,
          sharp()
            .resize(200)
            .composite([{ input: watermark, gravity: 'center', blend: 'overlay' }])
        )
      }
    })
  }

  return multer({
    storage: multerS3({
      s3,
      bucket: BUCKET,
      acl: 'public-read',
      shouldTransform: (_req, file, cb) => {
        cb(null, /^image/i.test(file.mimetype))
      },
      transforms
    })
  })
}

const uploadFromClient = (resize, setMetadata, setKey) => (req, res, next) =>
  upload(resize, setMetadata, setKey).single('photo')(req, res, next)

export default { uploadFromClient }
