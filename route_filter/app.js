const express = require("express");
const cors = require("cors");
const app  = express();
const route = require("./route")
app.use(cors());
app.use(express.json());

app.use("/books",route)


let port = 2000;
app.listen(port,()=>{
    console.log(`app listing port is ${port}`)
})

module.exports = app;