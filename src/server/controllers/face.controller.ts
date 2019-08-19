import { Response } from 'express'
import { RequestWithFile } from 'global'
import { create } from '../database/face'
import { errors } from '../utils'

async function post(req: RequestWithFile, res: Response) {
  try {
    const { _id: customerId } = req.user
    const originalFile = req.file.transforms.find(t => t.id === 'original')

    if (!originalFile) {
      throw new Error('Unable to find original file!')
    }

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
