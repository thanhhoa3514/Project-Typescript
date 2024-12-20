import {Request,Response} from "express";

import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelpers from "../../../helpers/search";
export const index= async (req:Request, res:Response) => {
    interface Find{
        deleted: boolean,
        status?: string,
        title?: RegExp,
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
    // Pagination
    const countTotalItems = await Task.countDocuments(find);
    
    let objectPagination = paginationHelper(
        {
        currentPage: 1,
        limitItems: 2,
        },
        req.query,
        countTotalItems
    );
    // End pagination
    // SEARCH
    const objectSearch = searchHelpers(req.query as any);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip||0);

    res.json(tasks);
}

// [GET] /api/v1/tasks/details/:id
export const detail=async (req:Request, res:Response) => {
    const id:string = req.params.id;

    const tasks = await Task.find({
        _id: id,

    });
    console.log(tasks);
    res.json(tasks);
}

// [PATCH] /api/v1/tasks/change-status/:id

export const changeStatus= async(req: Request, res: Response)=>{
    try {

        const id:string = req.params.id;
    
        const status:string = req.body.status;
        await Task.updateOne({
          _id: id,
        }, {
          status: status
        })
        res.json({
          code: 200,
          message: "Change status success",
        })
      }
      catch (error) {
        res.json({
          code: 400,
          message: "Change status failed",
        });
      }

};


// [PATCH] /api/v1/tasks/change-multi

export const changeStatusMulti= async(req: Request, res: Response)=>{
    enum Status{
        STATUS_ACTIVE = 'status',
        STATUS_DELETED = 'delete',
    }
    try {
        const ids:string[] =req.body.ids;
        const key:string=req.body.key;
        const value:string=req.body.value;
    
        switch (key) {
          case Status.STATUS_ACTIVE:
            await Task.updateMany({
              _id: { $in: ids },
    
            }, {
              status: value
            });
            res.json({
              code: 200,
              message: "Change status multi success",
            });
            break;
          case Status.STATUS_DELETED:
            await Task.updateMany({
              _id: {
                $in: ids
              }
            }, {
              delete: true,
              deletedAt: new Date()
            })
            res.json({
              code: 200,
              message: "Delete status multi success",
            });
            break;
          default:
            res.status(400).json({
                code: 400,
                message: "Invalid status"
            });

            break;
        }
    
      } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error',
        });
      }

};

// [POST] /api/v1/tasks/create

export const createTask= async(req: Request, res: Response)=>{
    
    try {
       
        const newTask = new Task(req.body);
        newTask.save();
        res.json({
          code: 200,
          message: "Create task success",
        });
      } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error',
        });
      }

};


// [PATCH] /api/v1/tasks/edit/:id

export const edit= async(req: Request, res: Response)=>{
    
    try {
      const id=req.params.id;
      await Task.updateOne({
        _id: id,
      }, req.body);
      res.json({
        code: 200,
        message: "Task has been edited successfully",
      });
    } catch (error) {
      res.json({
        code: 400,
        message: "Something went wrong",
      });
    }

};

// [DELETE] /api/v1/tasks/delete/:id

export const deleteTask= async(req: Request, res: Response)=>{
    
    try {
      const id=req.params.id;
      await Task.updateOne({
        _id: id,
      }, {
        deleted: true,
        deletedAt: new Date()
      });
      res.json({
        code: 200,
        message: "Task has been deleted successfully",
      });
    } catch (error) {
      res.json({
        code: 400,
        message: "Something went wrong",
      });
    }

};