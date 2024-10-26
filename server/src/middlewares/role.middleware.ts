import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/apiError"

export const roleMiddleware = (roles: any)=>(req: any, res: Response, next: NextFunction)=>{
    if(!roles.includes(req.user.role)){
        throw new ApiError(403, "Access denied")
    }
    next()
}
