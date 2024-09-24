const express=require('express')

const auth=require('../middleware/auth')
const {registerUser,loginUser,logoutUser}=require('../controllers/users')
const router=new express.Router();

router.post('/',registerUser);
router.post('/login',loginUser);
router.post('/logout',auth,logoutUser);

module.exports=router;