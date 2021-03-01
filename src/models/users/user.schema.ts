
import bcrypt from 'bcrypt';
import {Schema, HookNextFunction} from 'mongoose';
import { IUserDocument } from './user.types';

const SALT_WORK_FACTOR = 10;
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, select: false},
  mobile: {type: String, required: false },
  city: { type: String, required: false },
  country: {type: String, required: false },
},
{ timestamps: true });

UserSchema.pre<IUserDocument>('save', async function (next: HookNextFunction) {
  const user = this as IUserDocument;
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(password) {
  const user = this as IUserDocument;
  return bcrypt.compare(password, user.password);
};
export default UserSchema;