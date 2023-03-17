import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import UserRoutes from './routes/user.routes'
import { RouteExceptionHandler } from './utils/helpers/RouteExceptionHandler';
import { RouteNotFoundError } from './utils/exceptions/Exceptions';
import BaseResponse from './Http/Responses/BaseResponse';

const app: Express = express();

app.use(cors())
app.use(express.json())

app.use('/api/users', UserRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    new BaseResponse(res).error(error)    
})

app.use(RouteExceptionHandler(async (req: Request, res: Response) => {
    throw new RouteNotFoundError()
}))

export default app;