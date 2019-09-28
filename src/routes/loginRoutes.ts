import {Router, Request, Response, NextFunction} from "express"

interface RequestWithBody extends Request {
    /* The type-def file is wrong in assuming that body property would be present when it's only
    there when the body parser middleware is used. Should have been even if body was declared 
    - body: {[key: string]: string | undefined}; */
    body: {[key: string]: string | undefined}
}

const router = Router()
  
  
export { router };