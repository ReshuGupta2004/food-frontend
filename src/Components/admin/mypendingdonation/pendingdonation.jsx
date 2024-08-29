import  { useEffect, useState } from 'react';
import './pendingdonation.css';  
import Navigation from '../../Sidenav/sidenav';
import createToast from '../../../utils/toast';

const PendingDonations = () => {
  const [pendingDonations, setPendingDonations] = useState([]);

  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/v1/admin/admin/donations/pending');
        const data = await response.json();
        // console.log("data  ",data)
        if (data.success && data.pendingDonations) {
          setPendingDonations(data.pendingDonations);
        } else {
          // console.error('Failed to fetch pending donations:', data);
          createToast('Failed to fetch pending donations', "error");
        }
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

       <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
          <h5 className="m-0 color-theme d-inline-block">Pending Donations</h5>
        </div>

        <div className="col col-sm-10 col-12 m-auto my-4">
          <div className="table-responsive">
            <table className="table table-info table-striped table-hover m-0 bg-white">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Donor name</th>
                  <th scope="col">Food type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDonations.map((donation, index) => (
                  <tr key={donation._id}>
                    <th scope="row" data-label="#"> {index + 1}</th>
                    <td data-label="Donor name">{`${donation.donor.name}`}</td>
                    <td data-label="Food type">{donation.foodType}</td>
                    <td data-label="Quantity">{donation.quantity}</td>
                    <td data-label="Status" className={`fw-bold text-${donation.status}`}>{donation.status}</td>
                    <td data-label="Actions">
                      <a href={`/admin/donation/view/${donation._id}`} className="btn">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PendingDonations;