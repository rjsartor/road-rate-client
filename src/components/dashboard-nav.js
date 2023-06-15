import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
import '../styles/navbars/dashboard-nav.css';
import { useNavigate } from 'react-router-dom';

export const DashboardNav = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  return(
    <main className="dashboard-nav">
      <section className="logo-wrapper">
        <ul className="header-logo">
          <li onClick={() => {
            navigate(accessToken ? '/dashboard' : '/')}
          }
            className="header">
            <h1>RoadRate</h1>
          </li>
          <li className="icon"><img 
          src={icon} 
          alt="RoadRate icon" 
          className="icon"
          />
          </li>
        </ul>
      </section>
      <section className="header-middle-area">
        <nav className="main-nav" id="main-nav">
          <ul className="main-sections">
            <li className="claim-plate">
              <Link to="/claim-plate"
                className="claim-link"
              >
                <span>
                  Claim Plate
                </span>
              </Link>
            </li>
            <li className="my-plates">
              <Link to="/my-plates" 
                className="my-plates-link"
              >
                <span >
                  My Plates
                </span>
              </Link>
            </li>          
            <li className="my-reviews">
              <Link to='/my-reviews' 
                className="my-reviews-link"
              >
                <span >
                  My Reviews
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </section> 
    </main>
  );
}

export default DashboardNav;