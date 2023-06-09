import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import ReviewList from './review-list';
import DashboardNav from './dashboard-nav';
import '../styles/pages/dashboard.css';
import ReviewForm from './review-form';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

export const Dashboard = (props) => {
const [username, setUsername] = useState("");
  const [userId, setUserId ] = useState("");
  const [name, setName ] = useState("");
  const [submitReview, setSubmitReview ] = useState(false);
  const [plates, setPlates ] = useState([]);
  // const [user, setUser] = useState(null);

const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem('user'));

  const { isAuthenticated, isLoading, user, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
      }
    );

  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await auth0Client.getUser();
  //     console.log('user', user)
  //     return user;
  //   };
  //   const user = getUser();
  //   console.log('useEffect', user)
  // }, [])
  // console.log('user', user)

  
  const storeUser = async (userId, name, storePlates) => {
    // const res = await fetch(
    //   `${API_BASE_URL}/users/?search=${localStorage.user}`
    // );

    // // Pull out the data from response
    // const [ user ] = await res.json();
    
    // // Store user info on localStorage
    // localStorage.setItem('userId', user.id)
    // setUserId(user.id) 
    // userId = user.id
    
    // localStorage.setItem('name', user.name)
    // setName(user.name)
    // name = user.name
    
    // // Fetch & store plates on local storage
    // const getplates = await fetch(`${API_BASE_URL}/plates/all/${user.id}`)
    // const plates = await getplates.json();
   
    // setStorePlates(plates)
    // localStorage.setItem('hasPlates', plates)
    // storePlates = plates
   
    // return user;
  }

  // useEffect(() => {
  //   console.log('localStorage.user', localStorage.user)
  //   if (!localStorage.user) return;

  //   const fetchUser = async () => {
  //     console.log('trigger fetchUser')
  //     const res = await fetch(
  //       `${API_BASE_URL}/users/?search=${localStorage.user}`
  //     );
  //     const [user] = await res.json();
  //     localStorage.setItem('user', user)
  //     console.log('user', user)
  //     setUser(user);
  //   }

  //   fetchUser();
  // }, [localStorage.user]);



  // useEffect(() => {
  //   console.log('user', user)
  //   if (!user?.id) return;
  //   const fetchPlates = async () => {
  //     const res = await fetch(`${API_BASE_URL}/plates/all/${user.id}`)
  //     const plates = await res.json();

  //     console.log('plates', plates)
     
  //     setPlates(plates)
  //     localStorage.setItem('hasPlates', plates)
  //   }

  //   fetchPlates();

  //   // localStorage.removeItem('unclaimedPlate')
  //   // localStorage.removeItem('success')
  // }, [user?.id]);

  if (!isAuthenticated) {
    console.log('should navigage')
    navigate('/');
  }

  if (isLoading) return <p>loading</p>

  // return (
  //  <div>
  //     <div>
  //       <img src={user.picture} alt={user.name} />
  //       <h2>{user.name}</h2>
  //       <p>{user.email}</p>
  //       <button onClick={() => logoutWithRedirect()}>Logout</button>
  //     </div>
  //  </div>
  // );
 
  return (
    <main className="dashboard">
      <section className="logout-div">
        <Link to="/" id='logout-link'>
            <button className="logout" onClick={() => {
              logout();
              props.logout()
              localStorage.setItem("logout", true)
              }}>
              Logout
            </button>
        </Link >
      </section>
      <DashboardNav />
      <section className="dashboard-greeting">
        <p className="greeting-text">hey there, {user?.name}</p>
      </section>
      <button 
          className="add-review"
          onClick={ e => {
              e.preventDefault(); 
              setSubmitReview(!submitReview); 
            }
          }>
          <span className="new-review">New Review</span>
      </button>
      {submitReview && <ReviewForm plates={plates} />}
      <ReviewList /> 
    </main> 
  )
}

export default Dashboard;
