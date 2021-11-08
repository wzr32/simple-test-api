import { Response, Request, NextFunction } from 'express';
import User from './user.model';
import colors from 'colors';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ email, username });

    if (existingUser) return res.status(409).json({ message: 'Email or Username already in use.' });

    const newUser = new User({
      username,
      email,
      password: await User.hashPass(password)
    });

    await newUser.save();

    res.status(200).json({ message: 'User created successfuly' });

  } catch (err) {
    console.log(colors.bgRed.white('ERROR ON CREATE USER\n'), err);
    res.status(400).json({ message: 'Error on create user' });
    next()
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const users = await User.find({});

    console.log(users);

    if (!users) return res.status(400).json({ message: 'There is no users. Please create one' });

    return res.status(201).json(users);

  } catch (err) {
    console.log(colors.bgRed.white('ERROR GETTING ALL USERS\n'), err);
    return res.status(400).json({ mesasge: 'Error getting all users' });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {

    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: 'User was deleted or not exists' });

    return res.status(400).json(user);

  } catch (err) {
    console.log(colors.bgRed.white('ERROR GETTING USER\n'), err);
    return res.status(400).json({ mesasge: 'Error getting user' });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!user) return res.status(400).json({ message: 'user not exists or was deleted' });

    await user.save();

    return res.status(200).json({ message: 'user updated successfuly! ', user });

  } catch (err) {
    console.log(colors.bgRed.white('ERROR ON UPDATE USER\n'), err);
    return res.status(400).json({ mesasge: 'Error on update user' });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {

    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) return res.status(400).json({ message: 'user not exists or was deleted' });

    return res.status(200).json({ message: 'user deleted successfuly! ', user });

  } catch (err) {
    console.log(colors.bgRed.white('ERROR ON DELETE USER\n'), err);
    return res.status(400).json({ mesasge: 'Error on delete user' });
  }
};
