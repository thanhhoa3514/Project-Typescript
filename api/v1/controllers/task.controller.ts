import {Request,Response} from "express";

import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";

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
    // END: Find
    // Sort
    interface SortObject {
        [key: string]: 'asc' | 'desc' | 1 | -1;

    }
    const sort:SortObject={};
    if(req.query.sortKey&&req.query.sortValue){
        const sortKey = req.query.sortKey as string;
        const sortValue = req.query.sortValue as string;
        // Validate the sort value
        if (sortValue === 'asc' || sortValue === 'desc' || sortValue === '1' || sortValue === '-1') {
            sort[sortKey] = 
            sortValue === 'asc' ? 1 :
            sortValue === 'desc' ? -1 :
            sortValue === '1' ? 1 : -1;
        } 

    }

    // END: Sort
    const countTotalItems = await Task.countDocuments(find);

    let objectPagination = paginationHelper(
        {
        currentPage: 1,
        limitItems: 2,
        },
        req.query,
        countTotalItems
    );
    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip||0);

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