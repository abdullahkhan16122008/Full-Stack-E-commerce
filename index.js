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
import stripeRoutes from './routes/stripeRoutes.js';


dotenv.config();

let app = express();
let port = process.env.PORT || 3000;  // Using environment variable for the port

// Middleware setup

// ✅ These are the only domains that should access your API
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://mern-stack-e-commerce-eight.vercel.app',
  'https://mern-stack-e-commerce-qi7e.onrender.com',
  'https://full-stack-e-commerce-gd4t.onrender.com'
];

// ✅ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS error: Not allowed'));
    }
  },
  credentials: true, // if using cookies or auth headers
};

// ✅ Apply middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight support


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
