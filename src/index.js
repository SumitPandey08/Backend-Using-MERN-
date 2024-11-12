 
import dotenv from 'dotenv' 
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path : "./.env" 
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3011 , () => {
        console.log(`SErver is Running in Port : ${process.env.PORT}`);

            app.on("error" , (error) => {
            console.log("Error at Express :" , error)
        })
        
    })
})
.catch((error) => {
    console.error("Error In DB connection index.js",error)
})