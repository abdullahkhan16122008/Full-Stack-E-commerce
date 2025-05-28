import express from 'express';
import signUp from '../models/user.js'

const router = express.Router();

router.post('/users', async (req,res)=>{
    let Users = await signUp.find()
    res.json(Users)
});
// DELETE user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await signUp.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});


export default router;
