import { Response } from 'express'
import { faceRecognition } from '../utils'
import { errors } from '../utils'

async function post(req: RequestWithFile, res: Response) {
  try {
    const originalFile = req.file.transforms.find(t => t.id === 'original')

    if (!originalFile) {
      throw new Error('Unable to find original file!')
    }

    const { key } = originalFile

    const result = await faceRecognition.recognise(originalFile.bucket, key)

    return res.status(200).json(result)
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { post }
