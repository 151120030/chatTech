// // import React, { useState, useEffect, useRef } from 'react';
// // import { io } from 'socket.io-client';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faPaperPlane, faArrowLeft, faSmile, faPaperclip } from '@fortawesome/free-solid-svg-icons';
// // import EmojiPicker from 'emoji-picker-react';
// // import './sendchat.css';

// // function ChatPage({ selectedUser, onBack }) {
// //   const [message, setMessage] = useState('');
// //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// //   const [messages, setMessages] = useState([]);
// //   const messagesEndRef = useRef(null);

// //   const socket = useRef(null);

// //   const token = localStorage.getItem('token');
// //   const userId = localStorage.getItem('userId');
// //   const senderId = userId;
// //   const receiverId = selectedUser._id;

// //   useEffect(() => {
// //     // Initialize Socket.IO connection
// //     socket.current = io('http://localhost:7000', {
// //       auth: { token },
// //     });

// //     // Listen for incoming messages
// //     socket.current.on('receiveMessage', (newMessage) => {
// //       if (
// //         (newMessage.sender === receiverId && newMessage.receiver === senderId) ||
// //         (newMessage.sender === senderId && newMessage.receiver === receiverId)
// //       ) {
// //         setMessages((prevMessages) => [...prevMessages, newMessage]);
// //         scrollToBottom();
// //       }
// //     });

// //     return () => {
// //       socket.current.disconnect();
// //     };
// //   }, [senderId, receiverId, token]);

// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       try {
// //         const response = await fetch(
// //           `http://localhost:7000/api/chat/get?senderId=${senderId}&receiverId=${receiverId}`,
// //           {
// //             method: 'GET',
// //             headers: {
// //               'Content-Type': 'application/json',
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         if (response.ok) {
// //           const data = await response.json();
// //           setMessages(data);
// //           scrollToBottom();
// //         } else {
// //           console.error('Error fetching chat history');
// //         }
// //       } catch (err) {
// //         console.error('Error fetching chat history:', err);
// //       }
// //     };

// //     fetchMessages();
// //   }, [senderId, receiverId, token]);

// //   const scrollToBottom = () => {
// //     if (messagesEndRef.current) {
// //       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   };

// //   const handleSend = async () => {
// //     if (message.trim()) {
// //       const newMessage = {
// //         senderId,
// //         receiverId,
// //         message,
// //       };

// //       try {
// //         const response = await fetch('http://localhost:7000/api/chat/post', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify(newMessage),
// //         });

// //         if (response.ok) {
// //           const savedMessage = await response.json();
// //           setMessages((prevMessages) => [...prevMessages, savedMessage]);
// //           socket.current.emit('sendMessage', savedMessage);
// //           setMessage('');
// //           scrollToBottom();
// //         } else {
// //           console.error('Error sending message');
// //         }
// //       } catch (err) {
// //         console.error('Error sending message:', err);
// //       }
// //     }
// //   };

// //   const handleEmojiClick = (emojiData) => {
// //     setMessage((prevMessage) => prevMessage + emojiData.emoji);
// //     setShowEmojiPicker(false);
// //   };

// //   const profilePictureUrl = selectedUser.profilePicture
// //     ? `http://localhost:7000/${selectedUser.profilePicture}`
// //     : 'https://via.placeholder.com/40';

// //   return (
// //     <div className="chatpage-container">
// //       {/* Header */}
// //       {/* Header */}
// // <div className="chat-header">
// //   <button className="back-button" onClick={onBack}>
// //     <FontAwesomeIcon icon={faArrowLeft} />
// //   </button>
// //   <div className="user-info">
// //     <img src={profilePictureUrl} alt="User" className="profile-picture" />
// //     <span className="username">{selectedUser.Username}</span>
// //     {/* Call and Video Call Icons */}

// //   </div>
// // </div>


// //       {/* Chat Body */}
// //       <div className="chat-body">
// //         {messages.map((msg, index) => (
// //           <div key={index} className={`chat-bubble ${msg.sender === senderId ? 'sent' : 'received'}`}>
// //             <p>{msg.message}</p>
// //             <span className="timestamp">
// //               {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //             </span>
// //           </div>
// //         ))}
// //         <div ref={messagesEndRef} />
// //       </div>

// //       {/* Chat Input */}
// //       <div className="chat-input">
// //         <button className="emoji-button">
// //           <FontAwesomeIcon icon={faPaperclip} />
// //         </button>
// //         <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
// //           <FontAwesomeIcon icon={faSmile} />
// //         </button>
// //         {showEmojiPicker && (
// //           <div className="emoji-picker">
// //             <EmojiPicker onEmojiClick={handleEmojiClick} />
// //           </div>
// //         )}
// //         <input
// //           type="text"
// //           placeholder="Type your message and press enter..."
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //         />
// //         <button className="icon-button send-button" onClick={handleSend}>
// //           <FontAwesomeIcon icon={faPaperPlane} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatPage;
// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPaperPlane,
//   faArrowLeft,
//   faSmile,
//   faPaperclip,
//   faPhone,
//   faVideo,
//   faEllipsisV,
// } from '@fortawesome/free-solid-svg-icons';
// import EmojiPicker from 'emoji-picker-react';
// import './sendchat.css';

// function ChatPage({ selectedUser, onBack }) {
//   const [message, setMessage] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const socket = useRef(null);

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');
//   const senderId = userId;
//   const receiverId = selectedUser._id;

//   useEffect(() => {
//     socket.current = io('http://localhost:7000', {
//       auth: { token },
//     });

//     socket.current.on('receiveMessage', (newMessage) => {
//       if (
//         (newMessage.sender === receiverId && newMessage.receiver === senderId) ||
//         (newMessage.sender === senderId && newMessage.receiver === receiverId)
//       ) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         scrollToBottom();
//       }
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, [senderId, receiverId, token]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:7000/api/chat/get?senderId=${senderId}&receiverId=${receiverId}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setMessages(data);
//           scrollToBottom();
//         } else {
//           console.error('Error fetching chat history');
//         }
//       } catch (err) {
//         console.error('Error fetching chat history:', err);
//       }
//     };

//     fetchMessages();
//   }, [senderId, receiverId, token]);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleSend = async () => {
//     if (message.trim()) {
//       const newMessage = {
//         senderId,
//         receiverId,
//         message,
//       };

//       try {
//         const response = await fetch('http://localhost:7000/api/chat/post', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newMessage),
//         });

//         if (response.ok) {
//           const savedMessage = await response.json();
//           setMessages((prevMessages) => [...prevMessages, savedMessage]);
//           socket.current.emit('sendMessage', savedMessage);
//           setMessage('');
//           scrollToBottom();
//         } else {
//           console.error('Error sending message');
//         }
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prevMessage) => prevMessage + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   const profilePictureUrl = selectedUser.profilePicture
//     ? `http://localhost:7000/${selectedUser.profilePicture}`
//     : 'https://via.placeholder.com/40';

//   return (
//     <div className="chatpage-container">
//       {/* Header */}
//       <div className="chat-header">
//         <button className="back-button" onClick={onBack}>
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </button>
//         <div className="user-info">
//           <img src={profilePictureUrl} alt="User" className="profile-picture" />
//           <span className="username">{selectedUser.Username}</span>
//         </div>
//         <div className="header-icons">
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faPhone} />
//           </button>
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faVideo} />
//           </button>
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faEllipsisV} />
//           </button>
//         </div>
//       </div>


//       {/* Chat Body */}
//       <div className="chat-body">
//         {messages.map((msg, index) => {
//           const userPictureUrl = isSender
//           ? profilePictureUrl // Sender's profile picture
//           : selectedUser?.profilePicture
//             ? `http://localhost:7000/${selectedUser.profilePicture}`
//             : 'https://via.placeholder.com/40'; // Fallback for receiver

//         const senderPictureUrl = profilePictureUrl || 'https://via.placeholder.com/40';

//           return (
//             <div key={index} className={`message-wrapper ${isSender ? 'sent' : 'received'}`}>
//               {/* Profile picture for the user */}
//               {!isSender && (
//                 <img src={userPictureUrl} alt="Receiver" className="message-profile-picture" />
//               )}
//               <div className={`chat-bubble ${isSender ? 'sent' : 'received'}`}>
//                 <p>{msg.message}</p>
//                 <span className="timestamp">
//                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//               </div>
//               {/* Profile picture for the sender */}
//               {isSender && (
//                 <img src={profilePictureUrl} alt="Sender" className="message-profile-picture" />
//               )}
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>


//       {/* Chat Input */}
//       <div className="chat-input">
//         <button className="emoji-button">
//           <FontAwesomeIcon icon={faPaperclip} />
//         </button>
//         <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
//           <FontAwesomeIcon icon={faSmile} />
//         </button>
//         {showEmojiPicker && (
//           <div className="emoji-picker">
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//         <input
//           type="text"
//           placeholder="Type your message and press enter..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="icon-button send-button" onClick={handleSend}>
//           <FontAwesomeIcon icon={faPaperPlane} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;
// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPaperPlane,
//   faArrowLeft,
//   faSmile,
//   faPaperclip,
//   faPhone,
//   faVideo,
//   faEllipsisV,
// } from '@fortawesome/free-solid-svg-icons';
// import EmojiPicker from 'emoji-picker-react';
// import './sendchat.css';

// function ChatPage({ selectedUser, onBack }) {
//   const [message, setMessage] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const socket = useRef(null);

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');
//   const senderId = userId;
//   const receiverId = selectedUser._id;

//   useEffect(() => {
//     socket.current = io('http://localhost:7000', {
//       auth: { token },
//     });

//     socket.current.on('receiveMessage', (newMessage) => {
//       if (
//         (newMessage.sender === receiverId && newMessage.receiver === senderId) ||
//         (newMessage.sender === senderId && newMessage.receiver === receiverId)
//       ) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         scrollToBottom();
//       }
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, [senderId, receiverId, token]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:7000/api/chat/get?senderId=${senderId}&receiverId=${receiverId}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setMessages(data);
//           scrollToBottom();
//         } else {
//           console.error('Error fetching chat history');
//         }
//       } catch (err) {
//         console.error('Error fetching chat history:', err);
//       }
//     };

//     fetchMessages();
//   }, [senderId, receiverId, token]);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleSend = async () => {
//     if (message.trim()) {
//       const newMessage = {
//         senderId,
//         receiverId,
//         message,
//       };

//       try {
//         const response = await fetch('http://localhost:7000/api/chat/post', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newMessage),
//         });

//         if (response.ok) {
//           const savedMessage = await response.json();
//           setMessages((prevMessages) => [...prevMessages, savedMessage]);
//           socket.current.emit('sendMessage', savedMessage);
//           setMessage('');
//           scrollToBottom();
//         } else {
//           console.error('Error sending message');
//         }
//       } catch (err) {
//         console.error('Error sending message:', err);
//       }
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prevMessage) => prevMessage + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   const profilePictureUrl = selectedUser.profilePicture
//     ? `http://localhost:7000/${selectedUser.profilePicture}`
//     : 'https://via.placeholder.com/40';

//   return (
//     <div className="chatpage-container">
//       {/* Header */}
//       <div className="chat-header">
//         <button className="back-button" onClick={onBack}>
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </button>
//         <div className="user-info">
//           <img src={profilePictureUrl} alt="User" className="profile-picture" />
//           <span className="username">{selectedUser.Username}</span>
//         </div>
//         <div className="header-icons">
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faPhone} />
//           </button>
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faVideo} />
//           </button>
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faEllipsisV} />
//           </button>
//         </div>
//       </div>

//       {/* Chat Body */}
//       <div className="chat-body">
//         {messages.map((msg, index) => {
//   const isSender = msg.sender === senderId;
//   const userPictureUrl = isSender
//     ? `http://localhost:7000/${localStorage.getItem('userProfilePicture')}` // Logged-in user's picture
//     : selectedUser.profilePicture
//     ? `http://localhost:7000/${selectedUser.profilePicture}` // Selected user's picture
//     : 'https://via.placeholder.com/40'; // Fallback for receiver

//   return (
//     <div key={index} className={`message-wrapper ${isSender ? 'sent' : 'received'}`}>
//       {/* Profile picture */}
//       {!isSender && (
//         <img src={userPictureUrl} alt="Receiver" className="message-profile-picture" />
//       )}
//       <div className={`chat-bubble ${isSender ? 'sent' : 'received'}`}>
//         <p>{msg.message}</p>
//         <span className="timestamp">
//           {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         </span>
//       </div>
//       {/* Profile picture for sender */}
//       {isSender && (
//         <img src={userPictureUrl} alt="Sender" className="message-profile-picture" />
//       )}
//     </div>
//   );
// })}


//         <div ref={messagesEndRef} />
//       </div>

//       {/* Chat Input */}
//       <div className="chat-input">
//         <button className="emoji-button">
//           <FontAwesomeIcon icon={faPaperclip} />
//         </button>
//         <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
//           <FontAwesomeIcon icon={faSmile} />
//         </button>
//         {showEmojiPicker && (
//           <div className="emoji-picker">
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//         <input
//           type="text"
//           placeholder="Type your message and press enter..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="icon-button send-button" onClick={handleSend}>
//           <FontAwesomeIcon icon={faPaperPlane} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPaperPlane,
//   faArrowLeft,
//   faSmile,
//   faPaperclip,
//   faPhone,
//   faVideo,
//   faEllipsisV,
// } from "@fortawesome/free-solid-svg-icons";
// import EmojiPicker from "emoji-picker-react";
// import "./sendchat.css";

// // 🔥 Store a global socket instance to avoid multiple connections
// const socket = io("http://localhost:7000", {
//   auth: { token: localStorage.getItem("token") },
// });

// function ChatPage({ selectedUser, onBack }) {
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   const senderId = userId;
//   const receiverId = selectedUser._id;

//   useEffect(() => {
//     // 🔥 Join the chat room when the component mounts
//     socket.emit("join", senderId);

//     // 🔥 Listen for incoming messages
//     socket.on("receiveMessage", (newMessage) => {
//       if (
//         (newMessage.sender === receiverId && newMessage.receiver === senderId) ||
//         (newMessage.sender === senderId && newMessage.receiver === receiverId)
//       ) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         scrollToBottom();
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [senderId, receiverId]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:7000/api/chat/get?senderId=${senderId}&receiverId=${receiverId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setMessages(data);
//           scrollToBottom();
//         } else {
//           console.error("Error fetching chat history");
//         }
//       } catch (err) {
//         console.error("Error fetching chat history:", err);
//       }
//     };

//     fetchMessages();
//   }, [senderId, receiverId, token]);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleSend = async () => {
//     if (message.trim()) {
//       const newMessage = {
//         senderId,
//         receiverId,
//         message,
//         timestamp: Date.now(), // 🔥 Add timestamp for correct message order
//       };

//       try {
//         const response = await fetch("http://localhost:7000/api/chat/post", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newMessage),
//         });

//         if (response.ok) {
//           const savedMessage = await response.json();
//           setMessages((prevMessages) => [...prevMessages, savedMessage]);

//           // 🔥 Send the message via Socket.IO
//           socket.emit("sendMessage", savedMessage);

//           setMessage("");
//           scrollToBottom();
//         } else {
//           console.error("Error sending message");
//         }
//       } catch (err) {
//         console.error("Error sending message:", err);
//       }
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prevMessage) => prevMessage + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   const profilePictureUrl = selectedUser.profilePicture
//     ? `http://localhost:7000/${selectedUser.profilePicture}`
//     : "https://via.placeholder.com/40";

//   return (
//     <div className="chatpage-container">
//       {/* Header */}
//       <div className="chat-header">
//         <button className="back-button" onClick={onBack}>
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </button>
//         <div className="user-info">
//           <img src={profilePictureUrl} alt="User" className="profile-picture" />
//           <span className="username">{selectedUser.Username}</span>
//         </div>
//         <div className="header-icons">
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faPhone} />
//           </button>
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faVideo} />
//           </button>
//           <button className="icon-button">
//             <FontAwesomeIcon icon={faEllipsisV} />
//           </button>
//         </div>
//       </div>

//       {/* Chat Body */}
//       <div className="chat-body">
//         {messages.map((msg, index) => {
//           const isSender = msg.sender === senderId;
//           const userPictureUrl = isSender
//             ? `http://localhost:7000/${localStorage.getItem("userProfilePicture")}`
//             : selectedUser.profilePicture
//             ? `http://localhost:7000/${selectedUser.profilePicture}`
//             : "https://via.placeholder.com/40";

//           return (
//             <div key={index} className={`message-wrapper ${isSender ? "sent" : "received"}`}>
//               {/* Profile picture */}
//               {!isSender && <img src={userPictureUrl} alt="Receiver" className="message-profile-picture" />}
//               <div className={`chat-bubble ${isSender ? "sent" : "received"}`}>
//                 <p>{msg.message}</p>
//                 <span className="timestamp">
//                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                 </span>
//               </div>
//               {isSender && <img src={userPictureUrl} alt="Sender" className="message-profile-picture" />}
//             </div>
//           );
//         })}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Chat Input */}
//       <div className="chat-input">
//         <button className="emoji-button">
//           <FontAwesomeIcon icon={faPaperclip} />
//         </button>
//         <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
//           <FontAwesomeIcon icon={faSmile} />
//         </button>
//         {showEmojiPicker && (
//           <div className="emoji-picker">
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//         <input
//           type="text"
//           placeholder="Type your message and press enter..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="icon-button send-button" onClick={handleSend}>
//           <FontAwesomeIcon icon={faPaperPlane} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPaperPlane,
//   faArrowLeft,
//   faSmile,
//   faPaperclip,
//   faPhone,
//   faVideo,
//   faEllipsisV,
// } from "@fortawesome/free-solid-svg-icons";
// import EmojiPicker from "emoji-picker-react";
// import "./sendchat.css";

// // 🔥 Create socket instance inside useEffect
// let socket;

// function ChatPage({ selectedUser, onBack }) {
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   const senderId = userId;
//   const receiverId = selectedUser._id;

//   useEffect(() => {
//     // 🔥 Initialize socket connection only once
//     socket = io("http://localhost:7000", {
//       auth: { token },
//     });

//     socket.emit("join", senderId);

//     socket.on("receiveMessage", (newMessage) => {
//       if (
//         (newMessage.sender === receiverId && newMessage.receiver === senderId) ||
//         (newMessage.sender === senderId && newMessage.receiver === receiverId)
//       ) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         scrollToBottom();
//       }
//     });

//     return () => {
//       socket.disconnect(); // Cleanup
//     };
//   }, [senderId, receiverId]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:7000/api/chat/get?senderId=${senderId}&receiverId=${receiverId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setMessages((prevMessages) => {
//             const uniqueMessages = [...prevMessages];
//             data.forEach((msg) => {
//               if (!uniqueMessages.some((m) => m._id === msg._id)) {
//                 uniqueMessages.push(msg);
//               }
//             });
//             return uniqueMessages;
//           });
//           scrollToBottom();
//         } else {
//           console.error("Error fetching chat history");
//         }
//       } catch (err) {
//         console.error("Error fetching chat history:", err);
//       }
//     };

//     fetchMessages();
//   }, [senderId, receiverId, token]);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleSend = async () => {
//     if (message.trim()) {
//       const newMessage = {
//         senderId,
//         receiverId,
//         message,
//         timestamp: Date.now(),
//       };

//       try {
//         const response = await fetch("http://localhost:7000/api/chat/post", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newMessage),
//         });

//         if (response.ok) {
//           const savedMessage = await response.json();
//           setMessages((prevMessages) => [...prevMessages, savedMessage]);

//           socket.emit("sendMessage", savedMessage);

//           setMessage("");
//           scrollToBottom();
//         } else {
//           console.error("Error sending message");
//         }
//       } catch (err) {
//         console.error("Error sending message:", err);
//       }
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prevMessage) => prevMessage + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   return (
//     <div className="chatpage-container">
//       <div className="chat-header">
//         <button className="back-button" onClick={onBack}>
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </button>
//         <div className="user-info">
//           <span className="username">{selectedUser.Username}</span>
//         </div>
//       </div>

//       <div className="chat-body">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message-wrapper ${msg.senderId === senderId ? "sent" : "received"}`}>
//             <div className={`chat-bubble ${msg.senderId === senderId ? "sent" : "received"}`}>
//               <p>{msg.message}</p>
//               <span className="timestamp">
//                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//               </span>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="icon-button send-button" onClick={handleSend}>
//           <FontAwesomeIcon icon={faPaperPlane} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faArrowLeft,
  faSmile,
  faPaperclip,
  faPhone,
  faVideo,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './sendchat.css';

function ChatPage({ selectedUser, onBack }) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const socket = useRef(null);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const senderId = userId;
  const receiverId = selectedUser._id;

  useEffect(() => {
    socket.current = io('http://localhost:7000', {
      auth: { token },
    });

    socket.current.emit('join', userId)
    console.log('100000000000')

    socket.current.on('receiveMessage', (newMessage) => {
      console.log('dfgdfgdfgdfg', newMessage)
      if (
        (newMessage.sender === receiverId && newMessage.receiver === senderId) ||
        (newMessage.sender === senderId && newMessage.receiver === receiverId)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom();
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [senderId, receiverId, token]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/chat/get?senderId=${senderId}&receiverId=${receiverId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
          scrollToBottom();
        } else {
          console.error('Error fetching chat history');
        }
      } catch (err) {
        console.error('Error fetching chat history:', err);
      }
    };

    fetchMessages();
  }, [senderId, receiverId, token]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = async () => {
    if (message.trim()) {
      const newMessage = {
        sender : senderId,
        receiver: receiverId,
        message,
      };

      try {
        // const response = await fetch('http://localhost:7000/api/chat/post', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   },
        //   body: JSON.stringify(newMessage),
        // });

        // if (response.ok) {
          // const savedMessage = await response.json();
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          socket.current.emit('sendMessage', newMessage);
          setMessage('');
          scrollToBottom();
        // } else {
        //   console.error('Error sending message');
        // }
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const profilePictureUrl = selectedUser.profilePicture
    ? `http://localhost:7000/${selectedUser.profilePicture}`
    : 'https://via.placeholder.com/40';

  return (
    <div className="chatpage-container">
      {/* Header */}
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="user-info">
          <img src={profilePictureUrl} alt="User" className="profile-picture" />
          <span className="username">{selectedUser.Username}</span>
        </div>
        <div className="header-icons">
          <button className="icon-button">
            <FontAwesomeIcon icon={faPhone} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faVideo} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {messages.map((msg, index) => {
  const isSender = msg.sender === senderId;
  const userPictureUrl = isSender
    ? `http://localhost:7000/${localStorage.getItem('userProfilePicture')}` // Logged-in user's picture
    : selectedUser.profilePicture
    ? `http://localhost:7000/${selectedUser.profilePicture}` // Selected user's picture
    : 'https://via.placeholder.com/40'; // Fallback for receiver

  return (
    <div key={index} className={`message-wrapper ${isSender ? 'sent' : 'received'}`}>
      {/* Profile picture */}
      {!isSender && (
        <img src={userPictureUrl} alt="Receiver" className="message-profile-picture" />
      )}
      <div className={`chat-bubble ${isSender ? 'sent' : 'received'}`}>
        <p>{msg.message}</p>
        <span className="timestamp">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {/* Profile picture for sender */}
      {isSender && (
        <img src={userPictureUrl} alt="Sender" className="message-profile-picture" />
      )}
    </div>
  );
})}


        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="chat-input">
        <button className="emoji-button">
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
          <FontAwesomeIcon icon={faSmile} />
        </button>
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <input
          type="text"
          placeholder="Type your message and press enter..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="icon-button send-button" onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
