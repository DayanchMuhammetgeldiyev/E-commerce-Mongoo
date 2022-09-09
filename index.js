const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
const user = require("./routes/userRoutes");
dotenv.config()

mongoose.connect
(process.env.MONGO_DB)
.then(()=>console.log("DB Connnection")).catch((err)=>{
          console.log(err);
})


app.use(express.json());
app.use("/api/users", user);



app.listen(process.env.PORT || 3002, () =>{
          console.log("Listening on port 3002");
})