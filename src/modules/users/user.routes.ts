import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from './user.controller';

export const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.post('/', createUser);

userRouter.get('/:id', getUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);
