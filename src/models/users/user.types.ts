import { Document, Model } from "mongoose";
export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
    city: string;
    country: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}