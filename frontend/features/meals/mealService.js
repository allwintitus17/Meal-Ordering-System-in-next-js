import axios from 'axios';


// Base URL for the API
const API_URL = '/api/meals/'; 
axios.defaults.baseURL = 'https://meal-ordering-system-in-next-js.vercel.app';

// Create a new meal
const createMeal = async (mealData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Authorization with token
    },
  };

  try {
    const response = await axios.post(API_URL, mealData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to create meal');
  }
};

// Get all meals for authenticated user
const getMeals = async (token) => {
  console.log(token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Authorization with token
    },
  };

  try {
    const response = await axios.get(`${API_URL}all`, config);
    console.log(response) 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to get meals');
  }
};

const getUsersByLocation=async(token)=>{
  const config={
    headers:{
      Authorization :`Bearer ${token}`,
    },
  };
  try{
    const response=await axios.get(`${API_URL}users/:location`,config);
    return response.data;

  }catch(error){
    throw new Error(error.response?.data?.message || error.message || 'Failed to get meals');
  }
}



const mealsService = {
  createMeal,
  getMeals,
  getUsersByLocation
 
};

export default mealsService;
