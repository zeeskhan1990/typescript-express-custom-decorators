import {Router, Request, Response, NextFunction} from "express"

interface RequestWithBody extends Request {
    body: {[key: string]: string | undefined}
}

const passAuth = (req: Request, res: Response, next: NextFunction):void => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
      }    
      res.status(403);
      res.send('Not Allowed, login first!');
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
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
    `);
  });
  
  router.post('/login', (req: RequestWithBody, res: Response) => {
    /* The type def file is wrong assuming that body property would be present when it's only
    there when the body parser middleware is used. Should have been even if body was declared 
    - body: {[key: string]: string | undefined}; */
    const { email, password } = req.body;

   /*  if(email) {
        res.send(email.toUpperCase());
    } else {
        res.send("You must provide an email")
    } */

    if(email && password && email==="my@my.com" && password === "password") {
        req.session = {loggedIn: true}
        res.redirect('/')
    } else {
        res.send('Input my@my.com & password');
      }
  });

  router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/login">Login</a>
        </div>
      `);
    }
  });
  
  router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
  });

  router.get('/protected', passAuth, (req: Request, res: Response) => {
    res.send('Welcome to authenticated only route, logged in user');
  });
  
  export { router };