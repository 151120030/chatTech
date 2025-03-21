

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import ViewMaster from '../../Components/Viewmaster/ViewMaster';
// import logo from '../../images/chat_logo.png';
// import './chat.css'

// const Chat = () => {
//     const [chats, setChats] = useState([]); 
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchTerm, setSearchTerm] = useState(''); 
//     const [loading, setLoading] = useState(false);
//     const token = localStorage.getItem('token');

//     // Debugging loggedInUser state
//     useEffect(() => {
//         console.log(loggedInUser);
//     }, [loggedInUser]);

//     // Fetch the logged-in user's data
//     const fetchLoggedInUser = async () => {
//         try {
//             const response = await axios.get('http://localhost:7000/api/user/get', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setLoggedInUser(response.data.data);
//         } catch (error) {
//             console.error('Error fetching logged-in user:', error);
//         }
//     };

//     // Fetch users from the backend API
//     const fetchChats = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get('http://localhost:7000/api/user/getUserByUserName', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setChats(response.data.data); // Assuming the API returns a list of users
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch all users and logged-in user data on component mount
//     useEffect(() => {
//         fetchLoggedInUser();
//         fetchChats();
//     }, []);

//     return (
//         <>
//             <div className='d-flex'>
//                 <Container className="chat-container">

//                     {/* Logged-in User Info */}
//                     {loggedInUser && (
//                         <Row className="align-items-center mb-4">
//                             <Col xs={2}>
//                                 <Image
//                                     src={loggedInUser.profilePicture
//                                         ? `http://localhost:7000/${loggedInUser.profilePicture}`
//                                         : 'https://via.placeholder.com/50'}
//                                     roundedCircle
//                                     alt="Logged-in User"
//                                     width="70"
//                                     height="70"
//                                     className="logo_img"
//                                 />
//                             </Col>
//                             <Col xs={8} className='ms-3'>
//                                 <strong style={{ fontSize: "20px" }} className='ms-3'>{loggedInUser.Username}</strong>
//                             </Col>
//                         </Row>
//                     )}

//                     {/* Search Input */}
//                     <InputGroup className="mb-3">
//                         <InputGroup.Text>
//                             <FontAwesomeIcon icon={faSearch} />
//                         </InputGroup.Text>
//                         <FormControl
//                             placeholder="Search"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </InputGroup>

//                     {/* Loading Indicator */}
//                     {loading && <p>Loading...</p>}

//                     {/* Chat List */}
//                     {!loading && chats?.map((chat, index) => (
//                         <Row key={index} className="align-items-center mb-4">
//                             <Col xs={2}>
//                                 <Image
//                                     src={chat.profilePicture
//                                         ? `http://localhost:7000/${chat.profilePicture}`
//                                         : 'https://via.placeholder.com/50'}
//                                     roundedCircle
//                                     alt={chat.Username}
//                                     width="70"
//                                     height="70"
//                                     className="logo_img"
//                                 />
//                             </Col>
//                             <Col xs={8} className="ms-3">
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <strong className='ms-3'>{chat.Username}</strong>
//                                 </div>
//                             </Col>
//                         </Row>
//                     ))}
//                 </Container>
//                 <Container className='p-5'>
//                     <Col>
//                         <Row className="text-center mb-5 welcome-section">
//                             <Col>
//                             <img src={logo} alt="Chatech Logo"  className='home_logo'/>
//                                 <h1>Welcome to the ChaTech</h1>
//                                 <p>All your messages, calls, and shared files are protected with advanced end-to-end encryption, <br /> ensuring that only you and your intended recipient can access them.</p>
//                             </Col>
//                         </Row>

//                         {/* Options Section */}
//                         <Row className="chat-options">
//                         <Col className="chat-option">
//                                 <h3>End-to-End Encryption</h3>
//                                 <p>"All your messages, calls, and shared files are protected with advanced end-to-end encryption, ensuring that only you and your intended recipient can access them."</p>
//                             </Col>
//                             <Col className="chat-option">
//                                 <h3>No Data Sharing</h3>
//                                 <p>" We never share your personal information or chat data with third parties without your explicit consent."</p>
//                             </Col>
//                             <Col className="chat-option">
//                                 <h3>Secure Storage</h3>
//                                 <p>"Your account information and preferences are securely stored and protected with industry-standard security measures."</p>
//                             </Col>

//                         </Row>
//                     </Col>
//                 </Container>
//             </div>

//         </>


//     );
// };

// export default ViewMaster(Chat);

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import ChatPage from '../SendChat/ChatPage'; // Import the ChatPage component
// import './chat.css';
// import ViewMaster from '../../Components/Viewmaster/ViewMaster';

// const Chat = () => {
//   const [chats, setChats] = useState([]); // State for chat data
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input
//   const [loading, setLoading] = useState(false); // State for loading indicator
//   const [selectedChat, setSelectedChat] = useState(null); // Track selected user for chat
//   const token = localStorage.getItem('token');

//   // Fetch the logged-in user's data
//   const fetchLoggedInUser = async () => {
//     try {
//       const response = await axios.get('http://localhost:7000/api/user/get', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setLoggedInUser(response.data.data);
//     } catch (error) {
//       console.error('Error fetching logged-in user:', error);
//     }
//   };

//   // Fetch users from the backend API
//   const fetchChats = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:7000/api/user/getUserByUserName', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setChats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all users and logged-in user data on component mount
//   useEffect(() => {
//     fetchLoggedInUser();
//     fetchChats();
//   }, []);

//   // Handler to select a chat
//   const handleChatClick = (chat) => {
//     setSelectedChat(chat);
//   };

//   // Handler to go back to the chat list
//   const handleBackClick = () => {
//     setSelectedChat(null);
//   };

//   return (
//     <div className="d-flex">
//       {selectedChat ? (
//         // Show ChatPage when a user is selected
//         <ChatPage selectedUser={selectedChat} onBack={handleBackClick} />
//       ) : (
//         <Container className="chat-container">
//           {/* Logged-in User Info */}
//           {loggedInUser && (
//             <Row className="align-items-center mb-4">
//               <Col xs={2}>
//                 <Image
//                   src={
//                     loggedInUser.profilePicture
//                       ? `http://localhost:7000/${loggedInUser.profilePicture}`
//                       : 'https://via.placeholder.com/50'
//                   }
//                   roundedCircle
//                   alt="Logged-in User"
//                   width="70"
//                   height="70"
//                   className="logo_img"
//                 />
//               </Col>
//               <Col xs={8} className="ms-3">
//                 <strong style={{ fontSize: '20px' }} className="ms-3">
//                   {loggedInUser.Username}
//                 </strong>
//               </Col>
//             </Row>
//           )}

//           {/* Search Input */}
//           <InputGroup className="mb-3">
//             <InputGroup.Text>
//               <FontAwesomeIcon icon={faSearch} />
//             </InputGroup.Text>
//             <FormControl
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </InputGroup>

//           {/* Loading Indicator */}
//           {loading && <p>Loading...</p>}

//           {/* Chat List */}
//           {!loading &&
//             chats
//               ?.filter((chat) =>
//                 chat.Username.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((chat, index) => (
//                 <Row
//                   key={index}
//                   className="align-items-center mb-4"
//                   onClick={() => handleChatClick(chat)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <Col xs={2}>
//                     <Image
//                       src={
//                         chat.profilePicture
//                           ? `http://localhost:7000/${chat.profilePicture}`
//                           : 'https://via.placeholder.com/50'
//                       }
//                       roundedCircle
//                       alt={chat.Username}
//                       width="70"
//                       height="70"
//                       className="logo_img"
//                     />
//                   </Col>
//                   <Col xs={8} className="ms-3">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <strong className="ms-3">{chat.Username}</strong>
//                     </div>
//                   </Col>
//                 </Row>
//               ))}
//         </Container>
//       )}
//     </div>
//   );
// };

// export default ViewMaster(Chat);

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ChatPage from '../SendChat/ChatPage';
import logo from '../../images/chat_logo.png';
import './chat.css';
import ViewMaster from '../../Components/Viewmaster/ViewMaster';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const token = localStorage.getItem('token');
  const commentsEndRef = useRef(null);

  // Fetch the logged-in user's data
  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/user/get', {

        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
    
      setLoggedInUser(response.data.data);
    } catch (error) {
      console.error('Error fetching logged-in user:', error);
    }
  };

  // Fetch users from the backend API
  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:7000/api/user/getUserByUserName', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users and logged-in user data on component mount
  useEffect(() => {
    fetchLoggedInUser();
    fetchChats();
  }, []);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to the bottom whenever chats are updated
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Handler to select a chat
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  // Handler to go back to the welcome section
  const handleBackClick = () => {
    setSelectedChat(null);
  };

  return (
    <div className="d-flex">
      {/* Chat Container */}
      <Container className="chat-container">
        {/* Logged-in User Info */}
        {loggedInUser && (
          <Row className="align-items-center mb-4 ">
            <Col xs={2}>
              <Image
                src={
                  loggedInUser.profilePicture
                    ? `http://localhost:7000/${loggedInUser.profilePicture}`
                    : 'https://via.placeholder.com/50'
                }
                roundedCircle
                alt="Logged-in User"
                width="70"
                height="70"
                className="logo_img"
              />
            </Col>
            <Col xs={8} className="ms-3">
              <strong style={{ fontSize: '20px',color:"#330000" }} className="ms-3">
                {loggedInUser.Username}
              </strong>
            </Col>
          </Row>
        )}

        {/* Search Input */}
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <FormControl
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {/* Loading Indicator */}
        {loading && <p>Loading...</p>}

        {/* Chat List */}
        {!loading &&
          chats
            ?.filter((chat) =>
              chat.Username.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((chat, index) => (
              <Row
                key={index}
                className={`align-items-center chat-row ${selectedChat && selectedChat.Username === chat.Username ? 'active' : ''
                  }`}
                onClick={() => handleChatClick(chat)}
                style={{ cursor: 'pointer' }}
              >
                <Col xs={2}>
                  <Image
                    src={
                      chat.profilePicture
                        ? `http://localhost:7000/${chat.profilePicture}`
                        : 'https://via.placeholder.com/50'
                    }
                    roundedCircle
                    alt={chat.Username}
                    width="70"
                    height="70"
                    className="logo_img"
                  />
                </Col>
                <Col xs={8} className="ms-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong className="ms-3">{chat.Username}</strong>
                  </div>
                </Col>
              </Row>
            ))}
        <div ref={commentsEndRef} />
      </Container>

      {/* Replace Welcome Section */}
      <Container className="gx-0">
        {selectedChat ? (
          // Show ChatPage when a user is selected
          <ChatPage selectedUser={selectedChat} onBack={handleBackClick} />
        ) : (
          <Col>
            <Row className="text-center mb-5 welcome-section p-5 gx-0">
              <Col>
                <img src={logo} alt="Chatech Logo" className="home_logo" />
                <h1>Welcome to the ChaTech</h1>
                <p>
                  All your messages, calls, and shared files are protected with
                  advanced end-to-end encryption, ensuring that only you and your intended recipient can access them.
                </p>
              </Col>
            </Row>

            {/* Options Section */}
            <Row className="chat-options px-5 gx-0">
              <Col className="chat-option">
                <h3>End-to-End Encryption</h3>
                <p>
                  "All your messages, calls, and shared files are protected with advanced end-to-end encryption."
                </p>
              </Col>
              <Col className="chat-option">
                <h3>No Data Sharing</h3>
                <p>
                  "We never share your personal information or chat data with third parties without your explicit consent."
                </p>
              </Col>
              <Col className="chat-option">
                <h3>Secure Storage</h3>
                <p>
                  "Your account information and preferences are securely stored and protected."
                </p>
              </Col>
            </Row>
          </Col>
        )}
      </Container>
    </div>
  );
};

export default ViewMaster(Chat);

