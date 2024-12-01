import {Request,Response} from "express";

import Task from "../models/task.model";


export const index= async (req:Request, res:Response) => {
    interface Find{
        deleted: boolean;
        status?: string;
    }
    let find:Find={
        deleted: false,
    }

    // If query exists
    if(req.query.status){
        find.status = req.query.status.toString();
    }
    const tasks = await Task.find(find);

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