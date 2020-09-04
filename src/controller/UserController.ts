import { Request, Response }  from "express";
import { HashManager } from "../services/HashManager";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator";
import { SignupUser } from "../model/User";


export class UserController {
    public async signup(req: Request, res: Response){
        try {
            const userData: SignupUser = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(userData.password);

            const userBusiness = new UserBusiness();
            const userId = await userBusiness.signup(userData.name, userData.email, userData.nickname, hashPassword)

            const authenticator = new Authenticator();
            const acessToken = authenticator.generateToken({id: userId});

            res.status(200).send({token: acessToken})



        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
}