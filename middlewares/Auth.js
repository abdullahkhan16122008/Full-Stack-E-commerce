import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.header('authorization');

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(403).json({
      message: 'Unauthorized: JWT token is required',
    });
  }

  // Check for Bearer format
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user payload to request
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired JWT token',
    });
  }
};

export default ensureAuthenticated;
