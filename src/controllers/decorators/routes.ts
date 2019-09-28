import "reflect-metadata"
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from "express";

/**
 * What this does is that it ensures that the method being passed to handle a request endpoint
 * confirms to the requestHandler type definition
 */
interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
  }

function routeMaker(method: string) {
    return function(path: string) {
        return function(target: any, key: string, desc: RouteHandlerDescriptor): void {
            Reflect.defineMetadata(MetadataKeys.PATH, path, target, key)
            Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key)
        }
    }
}


export const get = routeMaker(Methods.GET);
export const put = routeMaker(Methods.PUT);
export const post = routeMaker(Methods.POST);
export const del = routeMaker(Methods.DELETE);
export const patch = routeMaker(Methods.PATCH);