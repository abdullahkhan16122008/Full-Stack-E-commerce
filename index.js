import express from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import signUp from "./models/user.js";
import signUpRoute from './routes/signUpRoute.js';
import productRoute from './routes/productRoute.js';
import handleGoogleLogin from './routes/handleGoogleLogin.js'
import cartRoute from './routes/cartRoute.js'
import checkoutRoute from './routes/checkoutRoute.js'
import usersRoute from './routes/usersRoute.js'
import stripeRoutes from './routes/stripe.js';


dotenv.config();

let app = express();
let port = process.env.PORT || 3000;  // Using environment variable for the port

// Middleware setup
// Allow requests from your frontend domain
const allowedOrigins = [
  'http://localhost:3000',
  'https://mern-stack-e-commerce-gamma.vercel.app',
  'https://mern-stack-e-commerce-eight.vercel.app' // ✅ your current frontend domain
];

// ✅ CORS middleware setup
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);

    // Allow if origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // If you're using cookies/auth headers
}));

// ✅ This line is necessary to handle preflight OPTIONS requests
app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
mongoose.connect("mongodb+srv://abdullahkhan293:abdullahkhan123456@projects.zpsxzmz.mongodb.net/ezitech?retryWrites=true&w=majority&appName=projects")
.then(() => {
  console.log('Connection Successful');
})
.catch((err) => {
  console.error('Connection failed:', err);
});

// Error listener for mongoose connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});

// Routes setup
app.use('/auth', signUpRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);
app.use('/api', usersRoute);
app.use('/api', checkoutRoute);
app.use('/auth/google', handleGoogleLogin);  // Google OAuth route
app.use('/api/stripe', stripeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
