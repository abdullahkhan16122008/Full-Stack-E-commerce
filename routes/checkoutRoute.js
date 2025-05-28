import express from 'express';
import order from '../models/checkout.js';
let router = express.Router();


router.post('/checkout', async (req,res)=>{
    try {
        let Order = await new order({
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
            paymentMethod: req.body.paymentMethod,
            productId: req.body.productId, 
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
        })
        let saved = await Order.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Issue'
        })
        console.log(err)
    }
})

router.post('/orders', async (req,res)=>{
    try {
        let Orders = await order.find()
            res.json(Orders)
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Issue'
        })
        console.log(err)
    }
})

router.delete('/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post('/orders-status', async (req,res)=>{
    try {
    const { orderId, status } = req.body;
    const updated = await order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order status updated", order: updated });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Issue'
        })
        console.log(err)
    }
})

export default router;