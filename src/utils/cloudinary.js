import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null ;
        // upload file cloudinary
        const reponce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
    })
   console.log("file is uploaded successfully" , reponce.url) ;
   return reponce ;
   
    
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove loacal temp file as operation got fail
    }
}

export {uploadOnCloudinary}
    
   