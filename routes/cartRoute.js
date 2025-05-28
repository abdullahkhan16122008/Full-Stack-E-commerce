import express from 'express';
import { Cart } from '../models/Cart.js';
let router = express.Router();


router.post('/cart', async (req,res)=>{
    // try {
    //     // let findCart = Cart.find()
    //     let cart = await new Cart({
    //         productEmail: req.body.productEmail,
    //         name: req.body.name,
    //         image: req.body.image,
    //         price: req.body.price,
    //         category: req.body.category,
    //     })
    //     let saved = await cart.save()
    //     res.status(201).json(saved)
    // } catch (err) {
    //     res.status(500).json({
    //         message: 'Internal Server Issue'
    //     })
    //     console.log(err)
    // }
})

export default router;