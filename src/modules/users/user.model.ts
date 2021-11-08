import { Schema, model, Model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUserAttributes {
  username: string
  email: string
  password: string
}

interface IUserModel extends Model<IUserAttributes> {
  hashPass(password: string): string
  checkPass(password: string, userPassword: string): boolean
}

const userSchema = new Schema<IUserAttributes, IUserModel>({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics.hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.checkPass = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

export default model<IUserAttributes, IUserModel>('User', userSchema);
