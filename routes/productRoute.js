import express from 'express'
import ensureAuthenticated from '../middlewares/Auth.js';
let router = express.Router();
import { Product } from '../models/products.js';
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()



// Configuration
    cloudinary.config({ 
        cloud_name: 'dssntjyxa', 
        api_key: '224699318684278', 
        api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
      });

router.post('/products', async (req,res)=>{

        // Upload an image
        let file = req.files.image;
     const uploadResult = await cloudinary.uploader.upload(file.tempFilePath,(err, result)=>{
        console.log('success')
     }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);

  try {
    const product = await new Product({
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      available: req.body.availabile,
      category: req.body.category,
      image: uploadResult.url,
      description: req.body.description,
    });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/productlist', async (req,res)=>{
try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
})

// router.post('/', ensureAuthenticated, async (req,res)=>{
// try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// })

export default router;
