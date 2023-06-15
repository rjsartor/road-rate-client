import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import ReviewList from './review-list';
import DashboardNav from './dashboard-nav';
import '../styles/pages/dashboard.css';
import ReviewForm from './review-form';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { findOrCreateUser } from '../auth/Auth0Provider';

export const Dashboard = () => {
// const [username, setUsername] = useState("");
// const [userId, setUserId ] = useState("");
// const [name, setName ] = useState("");
const [submitReview, setSubmitReview ] = useState(false);
const [plates, setPlates ] = useState([]);
// const [user, setUser] = useState(null);
const [userInfo, setUserInfo] = useState(null);

const { isAuthenticated, isLoading, user, logout, getIdTokenClaims } = useAuth0();
const navigate = useNavigate();

const accessToken = localStorage.getItem('accessToken');

  // const storeUser = async (userId, name, storePlates) => {
  //   const res = await fetch(
  //     `${API_BASE_URL}/users/?search=${localStorage.user}`
  //   );

  //   // Pull out the data from response
  //   const [ user ] = await res.json();
    
  //   // Store user info on localStorage
  //   localStorage.setItem('userId', user.id)
  //   setUserId(user.id) 
  //   userId = user.id
    
  //   localStorage.setItem('name', user.name)
  //   setName(user.name)
  //   name = user.name
    
  //   // Fetch & store plates on local storage
  //   const getplates = await fetch(`${API_BASE_URL}/plates/all/${user.id}`)
  //   const plates = await getplates.json();
   
  //   setStorePlates(plates)
  //   localStorage.setItem('hasPlates', plates)
  //   storePlates = plates
   
  //   return user;
  // }

  const getAccessToken = useCallback(async () => {
    try {
      const idTokenClaims = await getIdTokenClaims();
      const accessToken = idTokenClaims.__raw;
      localStorage.setItem('accessToken', accessToken);
      console.log('Access Token:', accessToken);
    } catch (error) {
      console.error('Failed to get access token:', error);
    }
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
        const _user = await findOrCreateUser({
          email: user.email,
          username: user.nickname,
          name: `${user?.given_name} ${user?.family_name}`,
        });

        setUserInfo(_user);
        localStorage.setItem("user", JSON.stringify(_user));
        localStorage.setItem('userId', _user.id);
        localStorage.setItem('name', _user.name);
      
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  }, [user]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated && !accessToken) navigate('/')

    // Call the function to get the access token
    getAccessToken();
    fetchUserInfo();
  }, [isLoading, isAuthenticated, accessToken, navigate, getAccessToken, fetchUserInfo]);

  useEffect(() => {
    if (!userInfo) return;
    const fetchPlates = async () => {
      const res = await fetch(`${API_BASE_URL}/plates/all/${userInfo.id}`)
      const userPlates = await res.json();
     
      setPlates(userPlates)
      localStorage.setItem('hasPlates', userPlates)
    }

    fetchPlates();

    // localStorage.removeItem('unclaimedPlate')
    // localStorage.removeItem('success')
  }, [userInfo]);

  if (isLoading) return <p>loading</p>

  return (
    <main className="dashboard">
      <section className="logout-div">
        <Link to="/" id='logout-link'>
            <button className="logout" onClick={() => {
              logout();
              localStorage.setItem("logout", true)
              }}>
              Logout
            </button>
        </Link >
      </section>
      <DashboardNav />
      <section className="dashboard-greeting">
        <p className="greeting-text">hey there, {user?.nickname}</p>
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
