import "reflect-metadata"
import {MetadataKeys} from "./MetadataKeys"

export function requestBodyValidator(...keys: string[]) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key)
    }
}

//requestBodyValidator('email', 'password', 'confirmPassword')