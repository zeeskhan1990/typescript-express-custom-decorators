import express from "express"

//A singleton so that only one instance of router exist throughout the app
export class AppRouter {
    private static router: express.Router

    static get instance(): express.Router {
        if(!AppRouter.router) {
            AppRouter.router = express.Router()
        }
        return AppRouter.router
    }
}