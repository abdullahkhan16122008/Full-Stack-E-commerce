import express from 'express';
import Stripe from 'stripe';
import order from '../models/checkout.js';
import dotenv from 'dotenv';
dotenv.config()




const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual secret key

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { productName, productPrice, productQuantity } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: productPrice * 100, // Stripe works in cents
          },
          quantity: productQuantity,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Stripe checkout failed' });
  }
});

export default router;
