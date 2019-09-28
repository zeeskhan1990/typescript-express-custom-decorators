import express from 'express';
import {router} from './routes/loginRoutes'
import bodyParser from 'body-parser';
import cookieSession from "cookie-session"
import {AppRouter} from "./AppRouter"
import './controllers/LoginController'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
//Session is added to the request, 'keys' is used to encrypt the session
app.use(cookieSession({keys: ['zeeshan']}))
app.use(router);
app.use(AppRouter.instance)

/* app.get('/', (req:Request, res: Response) => {
    res.send(`
    <h1>
    Hi There!
    </h1>
    `)
}) */

app.listen(3000, () => {
    console.log('Test express')
})