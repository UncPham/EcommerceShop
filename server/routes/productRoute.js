import express from 'express'
import { addProduct, listProduct, removeProduct, getProductById, addComment, recommendations } from '../controllers/productController.js'
import authMiddleware from "../middleware/auth.js"
import multer from 'multer'


const productRouter = express.Router();

// Image Storage Engine: where to storage food image
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`) // use this method, our filename will become unique
    }
}) 

const upload = multer({storage: storage})

// modify router
productRouter.post("/add",upload.single("image"), addProduct)
productRouter.get('/list', listProduct)
productRouter.post('/remove', removeProduct);
productRouter.get('/:id', getProductById);
productRouter.post("/:id", authMiddleware, addComment)


export default productRouter;
