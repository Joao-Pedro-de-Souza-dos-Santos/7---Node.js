import express, { response } from "express";

const app = express();
const port = 3000;
app.listen(3000, () => {
    console.log(`Server is  runnig on PORT ${port}...`);
});

app.route("/").get((_request, response) => {
    response.send({ className: "Class 01 Server" });
});