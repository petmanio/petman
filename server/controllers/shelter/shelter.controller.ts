import { NextFunction, Request, Response } from 'express';
import { createService } from '../../services/shelter/shelter.service';

const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shelter = await createService(req.body, req['pmSelectedUser']);
    res.status(200).json(shelter);
  } catch (err) {
    next(err);
  }
};

export { createHandler };

