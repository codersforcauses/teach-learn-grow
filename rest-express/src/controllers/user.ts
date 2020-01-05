import { RequestHandler } from 'express';
import { UserCreateInput } from '@prisma/photon';
import {
  getUserInfo,
  createUser,
  updateUser,
  currentUser
} from '../services/user';
import photon from '../services/photon';

export const upsertUser: RequestHandler = async (req, res) => {
  try {
    const data = await getUserInfo(req.headers.authorization);

    const currentUser: UserCreateInput = {
      id: data.sub,
      avatarUrl: data.picture,
      name: data.name,
      nickname: data.nickname
    };
    const user = await photon.users.findOne({ where: { id: currentUser.id } });
    if (!user) {
      return res.json(await createUser(currentUser, photon));
    } else {
      return res.json(await updateUser(currentUser, photon));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const retrieveUser: RequestHandler = async (req, res) => {
  try {
    res.json(await currentUser(req.headers.authorization, photon));
  } catch (err) {
    res.status(500).json(err);
  }
};
