// import React from 'react';

// const OrderItems = ({ meals = [] }) => {
//   return (
//     <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//       <thead style={{ backgroundColor: '#f0f0f0' }}>
//         <tr>
//           <th>User Name</th>
//           <th>Gender</th>
//           <th>Email</th>
//           <th>Phone Number</th>
//           <th>Location</th>
//           <th>Meal Selected</th>
//           <th>Date</th>
//           <th>Amount to be Paid</th>
//         </tr>
//       </thead>      
//       <tbody>
//         {meals.length > 0 ? (
//           meals.map((meal, index) => (
//             <tr key={index}>
//               <td>{meal.userName}</td>
//               <td>{meal.gender}</td>
//               <td>{meal.email}</td>
//               <td>{meal.phoneNumber}</td>
//               <td>{meal.location}</td>
//               <td>{meal.mealType.join(', ')}</td>
//               <td>{new Date(meal.date).toLocaleDateString('en-IN')}</td>
//               <td>{meal.totalAmount}</td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="8" style={{ textAlign: 'center' }}>
//               No meals available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };



// export default OrderItems;
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaFilePdf } from 'react-icons/fa'; // Optional: for download icon
import BackButton from './Backbutton';

const OrderItems = ({ meals = [] }) => {
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

      pdf.save('Placed Orders .pdf');
    });
  };

  return (
    <div>
    <BackButton/>
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
          {meals.length > 0 ? (
            meals.map((meal, index) => (
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
              <td colSpan="8" style={{ textAlign: 'center' }}>
                No meals available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={exportToPDF} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
        <FaFilePdf style={{ marginRight: '8px' }} />
        Download Orders Data as Pdf
      </button>
    </div>
    
  );
};

export default OrderItems;
