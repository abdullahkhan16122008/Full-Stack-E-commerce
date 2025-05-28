import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import signUp from '../models/user.js'; // Your mongoose model
import jwt from 'jsonwebtoken';

const router = express.Router();
const client = new OAuth2Client("43830713176-iijl87tnmq2mumirtkqge3328b35nfb1.apps.googleusercontent.com");

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "43830713176-iijl87tnmq2mumirtkqge3328b35nfb1.apps.googleusercontent.com",  // Your Google OAuth client ID
    });

    const { email, name } = ticket.getPayload();

    // Check if user already exists
    let user = await signUp.findOne({ email });
    if (!user) {
      // If user does not exist, create a new user
      user = new signUp({
        name,
        email,
        password: 'google-auth', // Set a placeholder password (Google authentication doesn't need a password)
        role: 0,
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Respond with JWT token and user info
    res.status(200).json({
      success: true,
      jwtToken,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('Google Login Error:', err);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
});

export default router;
