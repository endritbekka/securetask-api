import express, { Express } from 'express'
import cors from 'cors'

import UserRoutes from './routes/user.routes'

const app: Express = express();

app.use(cors())
app.use(express.json())

app.use('/api/users', UserRoutes)

export default app;