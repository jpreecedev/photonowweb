import AWS from 'aws-sdk'
const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION })
AWS.config.region = process.env.AWS_REGION

const collectionName = process.env.FACE_RECOGNITION_COLLECTION_NAME || ''

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

async function recognise(bucket: string, filename: string) {
  return new Promise((resolve, reject) => {
    rekognition.searchFacesByImage(
      {
        CollectionId: collectionName,
        FaceMatchThreshold: 95,
        Image: {
          S3Object: {
            Bucket: bucket,
            Name: filename
          }
        },
        MaxFaces: 1
      },
      function(err, data) {
        if (err) {
          return reject(err)
        }
        if (data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face) {
          return resolve(data.FaceMatches[0].Face)
        }
        return reject('Not recognized')
      }
    )
  })
}

async function addImageToCollection(bucket: string, s3Filename: string) {
  return new Promise((resolve, reject) => {
    const collectionName = process.env.FACE_RECOGNITION_COLLECTION_NAME || ''

    rekognition.indexFaces(
      {
        CollectionId: collectionName,
        ExternalImageId: s3Filename,
        Image: {
          S3Object: {
            Bucket: bucket,
            Name: s3Filename
          }
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

export default { addImageToCollection, recognise }
