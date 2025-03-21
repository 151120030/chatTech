import React from 'react'
import ViewMaster from '../../Components/Viewmaster/ViewMaster'
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../images/chat_logo.png';
import './home.css'
import {  faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  return (
    <Container className='p-5 text-center ms-auto'>
      <Col>
        <Row className="text-center mb-5 welcome-section">
          <Col>
            <img src={logo} alt="Chatech Logo"  className='home_logo'/>
            <h1>Welcome to the ChaTech</h1>
            <div className='btn btn-secure '>
            <FontAwesomeIcon icon={faLock} title="End-to-End Encryption" className='me-2'/>
              End-to-End Encryption
            </div>
            <p>All your messages, calls, and shared files are protected with advanced end-to-end encryption, <br /> ensuring that only you and your intended recipient can access them.</p>
          </Col>
        </Row>

        {/* Options Section */}
        <Row className="chat-options">
          <Col className="chat-option" >
            <h3>End-to-End Encryption</h3>
            <p>"All your messages, calls, and shared files are protected with advanced end-to-end encryption."</p>
          </Col>
          <Col className="chat-option">
            <h3>No Data Sharing</h3>
            <p>" We never share your personal information or chat data with third parties without your explicit consent."</p>
          </Col>
          <Col className="chat-option">
            <h3>Secure Storage</h3>
            <p>"Your account information and preferences are securely stored and protected with industry-standard security measures."</p>
          </Col>

        </Row>
      </Col>
    </Container>
  )
}

export default ViewMaster(Home)