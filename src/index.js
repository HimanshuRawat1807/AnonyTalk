import dotenv from "dotenv";
import express from "express"
import connectionDB from "./db/config.js";

dotenv.config({
  path:"./.env"
});


const app = express()
const PORT =  process.env.PORT ||  3000;


const  startServer = () => {

  connectionDB()
  .then(()=>{
    app.listen(PORT || 3000, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
})
  .catch((error)=>{
        console.error("MongoDB XOnnection Failed : ",error);
        
  })
};

startServer();






