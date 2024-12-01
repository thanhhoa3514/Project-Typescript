
import {Router,Request,Response} from "express";
const router:Router=Router();

import Task from "../../../models/task.model";


router.get("/", async (req:Request, res:Response) => {
    const tasks = await Task.find({
        deleted: false,
    });
    console.log(tasks);
    res.json(tasks);
});
router.get("/detail/:id", async (req:Request, res:Response) => {
    const id:string = req.params.id;

    const tasks = await Task.find({
        _id: id,

    });
    console.log(tasks);
    res.json(tasks);
});

export const taskRoutes:Router= router;