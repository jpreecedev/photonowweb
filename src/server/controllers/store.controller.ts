import { errors } from '../utils';
import { addOrUpdate } from '../database/store';

async function post(req, res) {
  try {
    const { _id } = req.user
    const { storeSettings } = req.body

    await addOrUpdate(_id, storeSettings)

    return res.status(200).json({})
  } catch (e) {
    errors.handle(e)

    return res.status(500).send(e)
  }
}

export default { post };
