import express, { Express, NextFunction, Request, Response } from 'express'
import 'express-async-errors';
import cors from 'cors'
import UserRoutes from './routes/UserRoutes'
import BaseResponse from './Http/Responses/BaseResponse';
const app: Express = express();

app.use(cors())
app.use(express.json())

app.use('/api/users', UserRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    BaseResponse(res).error(error)    
})

app.use((req, res) => {
    BaseResponse(res).routeNotFound()
})

export default app;