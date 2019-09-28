import { Request, Response, NextFunction } from 'express';
import {get, post, controller, use, requestBodyValidator as required} from "./decorators"

@controller('/')
class LoginController {

  @get('login')
  @use(uselessLogger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `)
  }

  @post('login')
  @required('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if(email && password && email==="my@my.com" && password === "password") {
        req.session = {loggedIn: true}
        res.redirect('/')
    }else {
        res.send('Input my@my.com & password');
    }
  }

  @get('logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}

function uselessLogger(req: Request, res: Response, next: NextFunction) {
  console.log('Oh see, a request!!')
  next()
}