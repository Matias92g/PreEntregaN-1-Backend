import { Router } from "express";

const usersRouter = new Router()

usersRouter.get('/home', ((req, res) =>{
    res.render("home")
}))

export default usersRouter