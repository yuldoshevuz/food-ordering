import { Request } from "express"
import multer from "multer"
import path from "path"

class FileUtility {
    private storage: multer.StorageEngine;
    public upload: multer.Multer;

    constructor () {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, "../", "public", "images"))
            },
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
            }
        });

        this.upload = multer({
            storage: this.storage,
            limits: { fileSize: 10000000 },
            fileFilter: (req, file, cb) => {
                this.checkFileType(req, file, cb)
            }
        })
    }

    private checkFileType(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
        try {
            const fileTypes = /jpg|jpeg|png|gif|heic/
            const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
            const mimetype = fileTypes.test(file.mimetype)
        
            if (extname && mimetype) {
                return cb(null, true)
            }

            cb(new Error(JSON.stringify({
                ok: false,
                message: "You did not upload a file in image format"
            })))
        } catch (error) {
            console.log(error)
            cb(new Error('Error occurred while checking file type'))
        }
    }
}

export default new FileUtility()