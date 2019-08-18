import jwt from 'jsonwebtoken'
import { addOrUpdate, getProfile } from '../database/user'
import { JWT_SECRET } from '../config'
import { errors } from '../utils'

async function generateToken(req, res) {
  try {
    const { id, provider, accessToken, profile } = req.body
    const { firstName, lastName } = profile

    const params = {
      id,
      accessToken,
      provider,
      profile: {
        firstName,
        lastName
      }
    }
    const jwtoken = jwt.sign(params, JWT_SECRET, { expiresIn: '1w' })

    await addOrUpdate({
      id,
      jwtoken,
      accessToken,
      provider,
      lat: 0,
      lng: 0
    })

    return res.status(200).json({ token: jwtoken })
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

async function post(req, res) {
  try {
    const { id, businessName, address, lat = 0, lng = 0, profile } = req.body

    const result = await addOrUpdate({
      id,
      businessName,
      address,
      profile,
      lat: +lat,
      lng: +lng
    })

    const response = {
      businessName: result.businessName,
      address: result.address,
      profile: result.profile,
      lat: result.lat,
      lng: result.lng
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
    const { profile } = await getProfile(id)

    const response = {
      emailAddress: profile.emailAddress,
      firstName: profile.firstName,
      lastName: profile.lastName,
      picture: {
        height: profile.picture.height,
        width: profile.picture.width,
        url: profile.picture.url
      }
    }

    return res.status(200).json(response)
  } catch (e) {
    errors.handle(e)
    return res.status(500).send(e)
  }
}

export default { generateToken, post, get }
