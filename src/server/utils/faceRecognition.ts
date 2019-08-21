const AWS = require('aws-sdk')
const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION })

require('dotenv').config()

AWS.config.region = process.env.AWS_REGION

async function listCollections(): Promise<AWS.Rekognition.ListCollectionsResponse> {
  return new Promise((resolve, reject) => {
    rekognition.listCollections((err, collections) => {
      if (err) {
        return reject(err)
      }

      return resolve(collections)
    })
  })
}

async function createCollection(collectionName) {
  return new Promise((resolve, reject) => {
    rekognition.createCollection({ CollectionId: collectionName }, (err, data) => {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
  })
}

async function addImageToCollection(filename: string, file: Buffer) {
  return new Promise((resolve, reject) => {
    const collectionName = process.env.FACE_RECOGNITION_COLLECTION_NAME || ''

    rekognition.indexFaces(
      {
        CollectionId: collectionName,
        ExternalImageId: filename,
        Image: {
          Bytes: file
        }
      },
      err => {
        if (err) {
          return reject(err)
        }
        return resolve()
      }
    )
  })
}

;(async () => {
  const collectionName = process.env.FACE_RECOGNITION_COLLECTION_NAME
  const collections = await listCollections()

  const hasCollections =
    collections && collections.CollectionIds && collections.CollectionIds.length

  const collectionIds = hasCollections ? collections.CollectionIds : []

  const hasCollection = collectionIds.find(c => c === collectionName)

  if (!hasCollection) {
    await createCollection(collectionName)
  }
})()

module.exports = { addImageToCollection }
