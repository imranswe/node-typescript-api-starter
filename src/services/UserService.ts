import {UserModel} from '../models/users/user.model';
import { IUser, IUserDocument } from '../models/users/user.types';
class UserService {
    constructor(){}

    async getAllUsers(query: any){
        const users: Array<IUser> = await UserModel.find(query);
        return users;
    }

    async getUserById(id: String){
        try{
            return await UserModel.findById(id);
        }
        catch(error){
            console.log("Error occured:"+ error.message);
        }
        
    }
    async createUser(user: IUserDocument){
        try {
            return await UserModel.create(user);
        }
        catch(error){
            console.log({error: error.message});
        }
    }

    async updateUser(id: String, user: IUserDocument){
        try {
            return await UserModel.findByIdAndUpdate(id, user, {
                new: true,
                runValidators: true,
                context: 'query'
            });
        }
        catch(error){
            console.log({error: error.message});
        }
    }
    
    async deleteUser(id: String){
        try {
            return await UserModel.findByIdAndRemove(id);
        }
        catch(error){
            console.log("Error occured:"+ error.message);
        }
    }
}

export default UserService;