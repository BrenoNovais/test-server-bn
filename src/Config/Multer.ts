import multer from "multer"
import path from "path"
import { Request } from "express"

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    
    Storage: multer.diskStorage({
        
        destination: (req: Request, file: any, cb: any) => {

            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
        },
    })}