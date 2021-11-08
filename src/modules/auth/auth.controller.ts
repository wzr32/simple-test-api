import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { SECRET_JWT, DB_HOST } from '../../shared/enviroment';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../users/user.model';
import colors from 'colors';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || await !User.checkPass(password, user.password)) {
      return res.status(400).json({ message: 'Email or password invalid' });
    };

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      SECRET_JWT as Secret,
      { expiresIn: '7d' }
    )

    res.status(200).json({ token });
  } catch (err) {
    console.log(colors.bgRed.white('ERROR ON LOGIN\n'), err);
    return res.status(400).json({ message: 'Error on login' });
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('verify token ');
};