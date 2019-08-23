import { addOrUpdate, getUser } from '../database/user'
import { errors } from '../utils'

async function post(req, res) {
  try {
    const {
      id,
      businessName,
      address,
      lat = 0,
      lng = 0,
      displayName,
      username,
      email
    } = req.body

    const result = await addOrUpdate({
      id,
      businessName,
      address,
      lat: +lat,
      lng: +lng,
      displayName,
      username,
      email
    })

    const response = {
      businessName: result.businessName,
      address: result.address,
      lat: result.lat,
      lng: result.lng,
      displayName,
      username,
      email
    }

    return res.status(200).json(response)
  } catch (e) {
    errors.handle(e)

    return res.status(500).send(e)
  }
}

async function get(req, res) {
  try {
    const { id } = req.params
    const user = await getUser(id)

    if (!user) {
      return res.status(404).send()
    }

    const response: IUser = {
      email: user.email,
      displayName: user.displayName,
      username: user.username
    }

    if (user.picture) {
      response.picture = {
        height: user.picture.height,
        width: user.picture.width,
        url: user.picture.url
      }
    }

    return res.status(200).json(response)
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { post, get }
