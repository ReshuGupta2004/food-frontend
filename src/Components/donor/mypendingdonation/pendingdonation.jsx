import { useEffect, useState } from 'react';
import Navigation from '../../Sidenav/sidenav';
import createToast from '../../../utils/toast';
const DonorPendingDonations = () => {
  const [pendingDonations, setPendingDonations] = useState([]);
// const data = JSON.parse(localStorage.getItem("userData"))
  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/v1/doner/doner/donations/pending', {
          method: 'GET',
          credentials: 'include',  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please log in');
          }
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log('Pending donations:', data.pendingDonations);
        setPendingDonations(data.pendingDonations);
      } catch (error) {
        // console.error('Error fetching pending donations:', error);
        createToast(error, "error");
      }
    };

    fetchPendingDonations();
  }, []);

  return (
    <main>
        <Navigation/>
        <div className="ssssssssssss" style={{height:"100vh"}}  >
        <div className="table-wrapper">
  <table className="table table-bordered" style={{overflowX:"auto !important"}}>
    <thead>
      <tr>
        <th scope="col">Donation ID</th>
        <th scope="col">Food Type</th>
        <th scope="col">Quantity</th>
        <th scope="col">Cooking Time</th>
        <th scope="col">Address</th>
        <th scope="col">Phone</th>
        <th scope="col">Donor To Admin Msg</th>
      </tr>
    </thead>
    <tbody>
      {pendingDonations.map((donation) => (
        <tr key={donation._id}>
          <td data-label="Donation ID">{donation._id}</td>
          <td data-label="Food Type">{donation.foodType}</td>
          <td data-label="Quantity">{donation.quantity}</td>
          <td data-label="Cooking Time">{donation.cookingTime}</td>
          <td data-label="Address">{donation.address}</td>
          <td data-label="Phone">{donation.phone}</td>
          <td data-label="Donor To Admin Msg">{donation.donorToAdminMsg}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    </main>
  );
};

export default DonorPendingDonations;
