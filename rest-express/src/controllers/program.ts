import { getPrograms, getApplicablePrograms, checkIfApplied } from '../services/program';
import Photon from '../services/photon';
import { RequestHandler } from 'express';

export const showPrograms: RequestHandler = async (req, res) => {
  try {
    res.json(await getPrograms(Photon));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const showApplicablePrograms: RequestHandler = async (req, res) => {
  try {
    res.json(await getApplicablePrograms(Photon));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const showIfApplied: RequestHandler = async (req, res) => {
  try {
    const {programID} = req.params;
    console.log(programID);
    
    res.json(await checkIfApplied(Photon, programID));
  } catch (err) {
    res.status(500).json(err);
  }
};