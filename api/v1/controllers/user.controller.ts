import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateStringRandom } from "../../../helpers/generateStringRandom";


// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (!emailExists) {
          // Mã hóa password
          const saltRounds = 10;
          const password = req.body.password;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
      
          req.body.password = hashedPassword;
          req.body.token = generateStringRandom(30);
            
           // Lưu user vào database
          const newUser = new User(req.body);
          await newUser.save();
            
          const token=newUser.token;

          res.status(200).send({
            message: "User registered successfully",
            token:token
          });
        } else {
           res.status(400).send({
            message: "Email already exists",
          });
          return;
        }
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while registering the user",
            // error: error.message,
        });
        return;
    }
};

// [POST] /api/v1/users/login
export const login= async(req: Request, res: Response): Promise<void> => {
    try {
        
        const email = req.body.email;
        const password = req.body.password;
        const userExists = await User.findOne({ email: email,deleted: false});
        if (!userExists) {
            res.status(404).send({
                message: "User not found"
            });
            return;
        }
    
    
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, userExists.password!);
        if(!passwordMatch) {
            res.status(401).send({
                message: "Invalid password"
            });
            return;
        } 
        
        res.status(200).send({
            message: "User logged in successfully",
            token: userExists.token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
};

// [GET] /api/v1/users/info
export const detail= async(req: Request& { user?: any }, res: Response): Promise<void> => {
    try {
        res.status(200).send({
            message: "User logged in successfully",
            //token: userExists.token
            user:req.user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
};

