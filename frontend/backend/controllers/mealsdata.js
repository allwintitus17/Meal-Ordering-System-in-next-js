const Mealdata=require('../models/mealsdata')
const User=require('../models/users')

// controllers/mealsdata.js
const createMeals = async (req, res) => {
    const prices = {
        Breakfast: 15,
        Lunch: 25,
        Dinner: 20
    };

    // Calculate the total amount based on the selected meals
    const selectedMeals = req.body?.mealType || [];
    let totalAmount = 0;

    selectedMeals.forEach(meal => {
        totalAmount += prices[meal] || 0; // Add the price of each selected meal
    });

    // Create a new meal document with the calculated total amount
    const meal = new Mealdata({
        user: req.user?._id,
        userName: req.body?.userName, // Include other fields as necessary
        gender: req.body?.gender,
        email: req.body?.email,
        phoneNumber: req.body?.phoneNumber,
        location: req.body?.location,
        mealType: selectedMeals,
        date: req.body?.date,
        totalAmount: totalAmount // Add the total amount to the meal data
    });

    try {
        await meal.save();
        res.status(200).send(meal);
    } catch (e) {
        res.status(400).send(e);
    }
};


const getAllMealsOrder=async(req,res)=>{
    try{

        const meals=await Mealdata.find({user:req?.user?._id})
        res.status(200).json(meals)

    }catch(error){
        res.status(500).json({message:'Server Error'})

    }
}

const getUsersByLocation = async (req, res) => {
    const location = req.params.location; 
    try {
       
        const users = await User.find({ location: location });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: `No users found in ${location}` });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports={
    createMeals,
    getAllMealsOrder,
    getUsersByLocation,
    
}