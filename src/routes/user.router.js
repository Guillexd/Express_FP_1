import { Router } from "express";
import UserManager from "../persistencia/daos/user.manager.js";

const router = Router();
const userManager = new UserManager();

router.post("/login", async(req, res) => {

  const user = await userManager.getUser(req.body);

  if(user.length){
    for (const key in req.body) {
      req.session[key] = req.body[key]
    }
    req.session.logged = true;
    if(user[0].email === 'adminCoder@coder.com' && user[0].password === 'adminCod3r123'){
      req.session.isAdmin = true
    } else {
      req.session.isAdmin = false
    }
    res.redirect('/api/products');
  }
  else{
    res.redirect('/view/error-login');
  }
});

router.post("/register", async(req, res) => {
  const newUser = await userManager.addUser(req.body);
  if(newUser)res.redirect('/view/login');
  else res.redirect('/view/error-register');
});

router.get("/logout", (req, res) => {
  req.session.destroy(err=>{
    if(err) console.log(err);
    else res.redirect('/view/login');
  })
});

export default router;
