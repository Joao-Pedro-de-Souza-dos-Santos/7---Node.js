import express from "express";
import { router } from "./routes";
import { appErrors } from "./middlewares/appErrors";
import { pageNotFoundError } from "./middlewares/pageNotFoundError";

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.use(pageNotFoundError);
app.use(appErrors);

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}...`);
    setTimeout(() => {console.log(`oh mi gode`)},3000);

    // for(let i = 1; i < 10; i++){
    //     let frase = `Rodando Server ${i}...`;
    //     setTimeout(() =>{
    //         console.log(frase);
            
    //     }, 3000);
    // }
});