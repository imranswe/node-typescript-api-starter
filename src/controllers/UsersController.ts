import express from 'express';
import {IUser, IUserDocument} from '../models/users/user.types';
import UserService from '../services/UserService';

class UsersController {
    public userService: UserService;
    constructor(service: UserService){
        this.userService = service;
    }
    getAll = async (request: express.Request, response: express.Response) => {
        const users: Array<IUser> = await this.userService.getAllUsers(request.params);
        response.status(200).send({users: users});
    }

    getUser = async (request: express.Request, response: express.Response) => {
        const user: IUserDocument | null | undefined  = await this.userService.getUserById(request.params.id);
        response.status(200).send({user: user});
    }
    store = async (request: express.Request, response: express.Response) => {
        const user: IUserDocument = request.body;
        const createdUser = await this.userService.createUser(user);
        response.status(200).send({user: createdUser});
    }
    update = async (request: express.Request, response: express.Response) => {
        const user: IUserDocument = request.body;
        const updatedUser = await this.userService.updateUser(request.params.id, user);
        response.status(200).send({user: updatedUser});
    }
    updatePartial = async (request: express.Request, response: express.Response) => {
        const user: IUserDocument = request.body;
        const updatedUser = await this.userService.updateUser(request.params.id, user);
        response.status(200).send({user: updatedUser});
    }
    delete = async (request: express.Request, response: express.Response) => {
        const removedUser: IUserDocument | null | undefined = await this.userService.deleteUser(request.params.id);
        response.status(200).send({user: removedUser});
    }
}

export default new UsersController(new UserService());