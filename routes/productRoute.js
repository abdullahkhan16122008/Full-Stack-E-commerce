import express from 'express'
import ensureAuthenticated from '../middlewares/Auth.js';
let router = express.Router();
import { Product } from '../models/products.js';




router.post('/products', async (req,res)=>{
  try {
    const product = await new Product({
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      available: req.body.availabile,
      category: req.body.category,
      image: req.body.image,
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