import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import path from "path";
import { fileURLToPath } from "url";
import router from "./Routers/TodoRouter.js";
dotenv.config({});

const app = express();

const port =  8000; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const corsOptions ={
    origin:"http://localhost:5173", // this is react's url
    credentials: true,                
} 


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",router)


app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.listen(port, ()=>{
    console.log(`listening to port ${port}....`);
})

