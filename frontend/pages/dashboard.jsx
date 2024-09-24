import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeals, reset } from '../features/meals/mealSlice';
import Spinner from '../components/Spinner';
import OrderItems from '../components/OrderItems';

const Dashboard = () => {
  const { meals, isLoading, isError, message } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

    
  dispatch(reset())

  // Fetch meals on component mount
  useEffect(() => {
    dispatch(getMeals());
    
    return (()=>{
      dispatch(reset())
    })
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Error fetching meals: {message}</h3>;
  }

  return (
    <>
      <h1>Placed Orders</h1>
      <div>
        {meals && meals.length === 0 ? (
          <h3>No Orders</h3>
        ) : (
          <OrderItems meals={meals} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
