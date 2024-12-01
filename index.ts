
import express,{Express} from "express";
import dotenv from "dotenv"
import * as database from "./config/database";

// routes
import mainV1Routes from "./api/v1/routes/index.route"

dotenv.config();
database.connect();
const app:Express = express();
const port:string|number = process.env.PORT||3000;


mainV1Routes(app);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});