import express from 'express';

class UsersMiddleware {
    beforeUserRoutes(request: express.Request, response: express.Response, next: express.NextFunction){
        console.log("In UsersMiddleware");
        next();
    }
}

export default new UsersMiddleware();
