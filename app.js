const Express = require('express');
const app = Express();
require("dotenv").config();
const dbConnection = require("./db")

app.use(require("./middleware/header"))
app.use(Express.json());

const controllers = require("./controllers");

app.use("/user", controllers.userController);
app.use("/mood", controllers.moodController);
app.use("/goal", controllers.goalController);

dbConnection.authenticate()
        .then(() => dbConnection.sync()) //=>  {force: true} {alter: true}  use for dropping tables, wipes out db
        .then(() =>{
        app.listen(process.env.PORT, ()=> {
                console.log(`[Server]: App is listening on ${process.env.PORT}`);
                });  
        })
        .catch((err)=>{
                console.log(`[server]: Server crashed. Error = ${err}`);
        });