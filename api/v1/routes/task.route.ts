
import {Router} from "express";
const router:Router=Router();

import * as controller from "../controllers/task.controller";

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeStatusMulti);
router.post("/create",controller.createTask);
router.patch("/edit/:id",controller.edit);
router.delete("/delete/:id",controller.deleteTask);

export const taskRoutes:Router= router;