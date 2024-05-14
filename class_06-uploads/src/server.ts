import express from "express";
import { router } from "./routes";
import { appErrors } from "./errors/appErrors"; 
import { pageNotFoundError } from "./errors/pageNotFoundError"; 
import "dotenv/config";
import { UPLOADS_FOLDER } from "./configs/uploadConfig";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/file", express.static(UPLOADS_FOLDER));
app.use(router);

app.use(pageNotFoundError);
app.use(appErrors);

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}...`);
});