const express=require('express')
const auth=require('../middleware/auth');
const router=new express.Router();
const {createMeals,getAllMealsOrder}=require('../controllers/mealsdata')


router.post('/',auth,createMeals);

router.get('/all',auth,getAllMealsOrder)



module.exports=router