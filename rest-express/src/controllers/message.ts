import { RequestHandler } from 'express';
import { getUserInfo } from '../services/user';
import photon from '../services/photon';
import pusher from '../services/pusher';
import { createMessage, deleteMessage } from '../services/message';
import feed from '../services/feed';

export const addMessage: RequestHandler = async (req, res) => {
  try {
    const user = await getUserInfo(req.headers.authorization);
    const result = await createMessage(user.sub, req.body.message, photon);
    pusher.trigger('message', 'new-message', {
      message: result
    });
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeMessage: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await deleteMessage(id, photon));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getFeed: RequestHandler = async (req, res) => {
  try {
    res.json(await feed(photon));
  } catch (err) {
    res.status(500).json(err);
  }
};
