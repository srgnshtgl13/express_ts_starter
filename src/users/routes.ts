import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }
    configureRoutes(): express.Application {
        this.app.route(`/users`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware will throw before any /users endpoint
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                return res.json({ data: req.url, message: 'users-get' })
            })
            .post((req: express.Request, res: express.Response) => {
                return res.json({ data: req.body, message: 'users-post' })
            });
        this.app.route(`/users/:userId`)
            .get((req: express.Request, res: express.Response) => {
                return res.json({ data: req.params.userId, message: 'user-get-by-id' })
            })
            .put((req: express.Request, res: express.Response) => {
                return res.json({ data: req.params.userId, message: 'user-put-by-id' })
            })
            .delete((req: express.Request, res: express.Response) => {
                return res.json({ data: req.params.userId, message: 'user-delete-by-id' })
            });
        return this.app;
    }
}