import express from 'express';
import {CommonRoutesConfig} from './CommonRoutesConfig';
import usersController from '../controllers/UsersController';
import usersMiddleware from '../middlewares/UsersMiddleware';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {

        this.app.route(`/users`)
            .get(usersController.getAll)
            .post(usersController.store);

        this.app.route(`/users/:id`)
            .all(usersMiddleware.beforeUserRoutes)
            .get(usersController.getUser)
            .put(usersController.update)
            .patch(usersController.updatePartial)
            .delete(usersController.delete);

        return this.app;
    }
}