import {Request,Response} from "express";

import Task from "../models/task.model";


export const index= async (req:Request, res:Response) => {
    const tasks = await Task.find({
        deleted: false,
    });
    console.log(tasks);
    res.json(tasks);
}

export const detail=async (req:Request, res:Response) => {
    const id:string = req.params.id;

    const tasks = await Task.find({
        _id: id,

    });
    console.log(tasks);
    res.json(tasks);
}