import { create } from '../database/face'
import { errors } from '../utils'

async function post(req, res) {
  try {
    const { _id: customerId } = req.user
    const originalFile = req.file.transforms.find(t => t.id === 'original')

    const { originalname, mimetype } = req.file

    const face = {
      customerId,
      filename: originalname,
      mimeType: mimetype,
      bucket: originalFile.bucket,
      contentType: originalFile.contentType,
      location: originalFile.location,
      originalEtag: originalFile.etag
    }

    const result = await create(face)

    return res.status(200).send({
      location: result.location
    })
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { post }
