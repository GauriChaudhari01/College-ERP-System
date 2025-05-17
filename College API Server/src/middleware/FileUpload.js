import multer from "multer";
import path from "path";

let imageStorage = multer.diskStorage({
    destination: (req,file,next)=>{
        next(null,"UploadImages")
    },
    filename:(req,file,next)=>
    {
        next(null,`${req.body.Name}${path.extname(file.originalname)}`)
    }
})
export const upload = multer({storage: imageStorage}) 