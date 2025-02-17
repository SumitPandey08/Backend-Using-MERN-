import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express() ;

app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials : true 
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true , limit : '16kb'}))  // url cleaner / loader
app.use(express.static("public")) // for controlling mage in public folder
app.use(cookieParser())



// Import routes
import userRouter from './routes/user.route.js';

// Root declaration
app.use("/api/v1/users", userRouter);

export { app };
