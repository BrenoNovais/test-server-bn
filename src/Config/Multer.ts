import multer from "multer"
import path from "path"
import { Request } from "express"

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),

    Storage: multer.diskStorage({

        destination: (req: Request, file: any, cb: any) => {

            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
        },
    }),

    limits: {
        fileSize: 2 * 1024 * 1024
    },
    
    fileFilter: async (req: Request, file: any, cb: any) => {
        const allowedMines = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ]

        if (allowedMines.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("invalid file type"))
        }
    }
}