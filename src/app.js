import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extends:true, limit:"16kb"}))
app.use(express.static("public"))

// import error handler
import errorHandler from "./middlewares/error.middleware.js";


// import Router
// post router
import postRouter from "./routes/post.route.js"
// user router
import userRouter from "./routes/user.route.js"
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)

// error handler
app.use(errorHandler);


export {app};