
import {Router} from "express";
const router:Router=Router();

import * as controller from "../controllers/user.controller";

router.post("/register",controller.register);
router.post("/login",controller.login);
router.get("/info/:id",controller.detail);


export const userRoutes:Router= router;