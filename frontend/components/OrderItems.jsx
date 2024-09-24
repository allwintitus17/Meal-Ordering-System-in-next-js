
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaFilePdf } from 'react-icons/fa'; // Optional: for download icon
import BackButton from './Backbutton';
import {reset,getUsersByLocation} from '../features/meals/mealSlice';
import { useDispatch} from 'react-redux';


const OrderItems = ({ meals = [] }) => {
  const [filteredMeals, setFilteredMeals] = useState(meals);
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Handle location change
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const dispatch=useDispatch()

  // Filter meals based on selected location
  useEffect(() => {
    const filterMealsByLocation = () => {
      if (selectedLocation === 'All') {
        setFilteredMeals(meals); // No filtering, show all meals
      } else {
        const filtered = meals.filter((meal) => meal.location === selectedLocation);
        setFilteredMeals(filtered);
      }
    };

    // Dispatch the function (simulating a data fetch based on location)
   dispatch (getUsersByLocation(selectedLocation)) 
    filterMealsByLocation(); // Apply the filtering logic
  }, [selectedLocation, meals]);

  const exportToPDF = () => {
    const input = document.getElementById('order-items-table');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 295; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Placed Orders.pdf');
    });
  };

  return (
    <div>
      <BackButton />
      {/* Dropdown for selecting location */}
      <label htmlFor="location-select" style={{ marginRight: '10px' }}>Filter by Location:</label>
      <select id="location-select" value={selectedLocation} onChange={handleLocationChange} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        <option value="All">All</option>
        <option value="Erode">Erode</option>
        <option value="Coimbatore">Coimbatore</option>
        <option value="Chennai">Chennai</option>
      </select>

      <table
        id="order-items-table"
        border="1"
        cellPadding="10"
        style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}
      >
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>User Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>Meal Selected</th>
            <th>Date</th>
            <th>Amount to be Paid</th>
          </tr>
        </thead>
        <tbody>
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal, index) => (
              <tr key={index}>
                <td>{meal.userName}</td>
                <td>{meal.gender}</td>
                <td>{meal.email}</td>
                <td>{meal.phoneNumber}</td>
                <td>{meal.location}</td>
                <td>{meal.mealType.join(', ')}</td>
                <td>{new Date(meal.date).toLocaleDateString('en-IN')}</td>
                <td>{meal.totalAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No meals available</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={exportToPDF} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
        <FaFilePdf style={{ marginRight: '8px' }} />
        Download Orders Data as PDF
      </button>
    </div>
  );
};

export default OrderItems;
