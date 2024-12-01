
import express,{Express,Request,Response} from "express";
import dotenv from "dotenv"
import * as database from "./config/database";
import Task from "./models/task.model";


dotenv.config();
database.connect();
const app:Express = express();
const port:string|number = process.env.PORT||3000;
app.get("/task", async (req:Request, res:Response) => {
    const tasks = await Task.find({
        deleted: false,
    });
    console.log(tasks);
    res.json(tasks);
});
app.get("/task/detail/:id", async (req:Request, res:Response) => {
    const id:string = req.params.id;

    const tasks = await Task.find({
        _id: id,

    });
    console.log(tasks);
    res.json(tasks);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});