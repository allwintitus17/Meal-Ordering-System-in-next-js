const express=require('express')
const auth=require('../middleware/auth');
const router=new express.Router();
const {createMeals,getAllMealsOrder,getUsersByLocation}=require('../controllers/mealsdata')


router.post('/',auth,createMeals);

router.get('/all',auth,getAllMealsOrder)

router.get('/users/:location', getUsersByLocation);


module.exports=router