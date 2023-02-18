import express from 'express';


/**
 * ___ABOUT ABSTRACT___
 * with abstract we will have some functionality like configuring API endpoints
 * for each route.config(users,posts, etc...) we'll have. but we will need different implementation
 * for each class
 */
export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;
    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
    abstract configureRoutes(): express.Application;
}