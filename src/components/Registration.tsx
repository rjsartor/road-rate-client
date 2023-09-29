import React from 'react';
import icon from '../assets/thumbs-up.png';
import '../styles/forms/registration-form.css';

const Registration: React.FC = () => {
  return (
    <div className="registration-page">
        <img
            src={icon}
            alt="icon"
            className="registration-icon"
        />
        <h1>Register for RoadRate</h1>
        <div className='reg-h5'>
            <h5 id="reg-h5">Information is confidential and 100% anonymous</h5>
        </div>
        {/* <RegistrationForm /> */}
    </div>
  );
};

export default Registration;
