import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
import '../styles/navbars/dashboard-nav.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const PagesNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const accessToken = localStorage.getItem('accessToken');

  let claimPlate = "/claim-plate"
  let myPlates = "/my-plates";
  let myReviews = "/my-reviews"

  // if (isLoading) return <p>loading</p>

  // if (!accessToken) {
  //   claimPlate = myPlates = myReviews = "/login";
  // }

  return(
    <main className="pages-nav">
      <div className="logout-div">
        <button className="logout" onClick={() => {
          localStorage.setItem("logout", true)
          logout();
        }}>
          Log out
        </button>
      </div>
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
              <Link to={claimPlate}
                className="claim-link"
              >
                <span>
                  Claim Plate
                </span>
              </Link>
            </li>
            <li className="my-plates">
              <Link to={myPlates} 
                className="my-plates-link"
              >
                <span >
                  My Plates
                </span>
              </Link>
            </li>          
            <li className="my-reviews">
              <Link to={myReviews} 
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

export default PagesNav;