import React, { useState, useRef, FC } from 'react';
import icon from '../assets/thumbs-up.png';
import '../styles/pages/about.css';
import { useAuth0 } from '@auth0/auth0-react';
import Spacer from './common/Spacer';

interface AboutModalProps {
    title: string;
    onClose: () => void;
    show: boolean;
    toggleModal: (bool: boolean) => void;
    
}

export const About: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { loginWithRedirect } = useAuth0();

  const onClose = (): void => setModalOpen(false);

  const Button: FC = () => {
    return (
        <button className="close" onClick={() => setModalOpen(false)}>X</button>
    );
  };

  const AboutModal: FC<AboutModalProps> = ({ title }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <div className="overlay">
            <div className="about-modal">
                <div className="modal-guts">
                    <h1 id="about-h1">{title}</h1>
                    <div className="content" ref={modalRef}>
                        <AboutSection />
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const AboutSection: FC = () => {
    return (
      <div className="about">
          <img src={icon} alt="icon" className="about-icon" />
          <p id='question-0'><b>RoadRate was designed for the over 220 million drivers currently licensed in America.</b><br />RoadRate is a social platform for reviewing fellow drivers and keeping track of your own RoadRating. Register license plates, browse/search/post reviews, and build up a karma score to let others know you are a great driver. RoadRate was founded to safely, confidentially and anonymously encourage quality road etiquette.</p>
          <p id='question-3'><b>Did you know that road crashes cost the US $230.6 billion per year? That is an average of $820 for every person.</b><br/> RoadRate aims to increase awareness and accountability on the road.</p>
          <p id='question-1'><b>Witnessed something on the road that should have been reported?</b><br/> Use RoadRate to search license plates, rate them, leave reviews and browse other users reviews.</p>
          <p id='question-2'><b>Have you ever relied on the help of a complete stranger for a jump or tire change?</b><br/> Use RoadRate to say thanks by leaving them a great review and increasing their karma score.</p>
          <p id='question-4'>RoadRate encourages positive reviews for great driving skills and random acts of kindness, and as such, recommend leaving honest, negative reviews when there is room for improvement.</p>
          <h5 id='about-footer'>Please not use RoadRate while operating a motor vehicle.</h5>
          <Spacer height={2} />
          <h4 onClick={() => loginWithRedirect()} className="register-link">Start your journey with RoadRate today!</h4>
          <Spacer height={2} />
          <Button />
      </div>
    );
  };

  return (
    <div className='about'>
        <button className="about-button" id="about-button" onClick={() => setModalOpen(true)}>Learn More</button>
        {modalOpen && (
            <AboutModal
                show={modalOpen}
                toggleModal={setModalOpen}
                title="About RoadRate"
                onClose={onClose}
            />
        )}
    </div>
  );
};

export default About;
