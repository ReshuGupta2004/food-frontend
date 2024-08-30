import { useState, useEffect } from 'react';
import './agent.css';  
import Navigation from '../../Sidenav/sidenav';
import createToast from '../../../utils/toast';

const Agentdata = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/v1/admin/admin/allagents');
        const data = await response.json();
        
        if (data.success && Array.isArray(data.agents)) {
          setAgents(data.agents);
        } else {
          createToast('Fetched data is not an array', "error");
        }
      } catch (error) {
        createToast(error, "error");
      }
    };
    
    fetchAgents();
  }, []);

  return (
    <main>   
      <Navigation />
      <div id="main-wrapper" style={{height:"100vh"}}>
        <div className="agents-main">
          <span className="me" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
        </div>
        <div className="table-responsive">
          <table className="table table-info table-striped table-hover m-0 bg-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Agent name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Join time</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={index}>
                  <th scope="row" data-label="#"> {index + 1}</th>
                  <td data-label="Agent name">{agent.name}</td>
                  <td data-label="Email">{agent.email}</td>
                  <td data-label="Phone">{agent.phone}</td>
                  <td data-label="Join time">{new Date(agent.joinedTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Agentdata;
