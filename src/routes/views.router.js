import { Router } from "express";
import { isLogged, isntLogged } from "../middleware/login.middleware.js";

const router = Router();

router.get("/login", isntLogged, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", isntLogged, (req, res) => {
  res.render("register", { title: "Register" });
});

// router.get("/profile", isLogged, (req, res) => {
//   res.render("home", {
//     title: "Profile",
//     admin: req.session.isAdmin ? "Eres admin" : "No eres admin",
//   });
// });

router.get("/error-login", isntLogged, (req, res) => {
  res.render("errorLogin", { title: "Error-Login" });
});

router.get("/error-register", isntLogged, (req, res) => {
  res.render("errorRegister", { title: "Error-Register" });
});

export default router;
