import "reflect-metadata"
import {RequestHandler} from "express"
import {MetadataKeys} from "./MetadataKeys"

//The type comes from express middlware itself
export function use(middleware: RequestHandler) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || []
        
        Reflect.defineMetadata(
            MetadataKeys.MIDDLEWARE,
            [...middlewares, middleware],
            target,
            key
          );
    }
}