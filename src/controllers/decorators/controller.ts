import "reflect-metadata"
import {AppRouter} from "../../AppRouter"
import { MetadataKeys } from "./MetadataKeys"
import { Methods } from "./Methods"
import { RequestHandler, Request, Response, NextFunction } from "express"

function requestBodyValidators(keys: string[]): RequestHandler { 
    return function(request: Request, response: Response, next: NextFunction) {
        if(!request.body) {
            response.status(422).send('Request Body Missing')
            return
        }
        for(let key of keys) {
            if(!request.body[key]) {
                response.status(422).send('Malformed request body')
                return
            }
        }        
        next()
    }
}

/**
 * This decorator loops over all the methods defined in the class, finds the metadata embedded in 
 * them by different known names defined in the Metadata keys. Then for each method creates a 
 * router http request method handler by assembling the metadatas derived from each of them.
 * @param routePrefix The base path url that's to be appended to any routes defined in this controller
 */
export function controller(routePrefix: string) {
    return function(target: Function): void {
        const router = AppRouter.instance
        //The target in the case of a class decorator is the compiled function constructor itself, and not it's
        //prototype in constrast to that for a method decorator, so to access methods you need to access the 
        //prototype of the target where the actual methods are defined
        for(let key in target.prototype) {
            const routeHandler = target.prototype[key]            
            const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];
            const validator = requestBodyValidators(requiredBodyProps)
            
            if (path) {
                //The enum also helps in type-checking here
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
           
        }
    }
}