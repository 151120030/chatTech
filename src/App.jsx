import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import RegisterForm from './Components/registration/RegisterForm';
import LogIn from './Components/Login/LogIn';
import { LoginContext } from './context';
import { useState } from 'react';
import Chat from './Pages/Chats/Chat';
import Home from './Pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatPage from './Pages/SendChat/ChatPage';

function App() {
  const [logindata, setlogindata] = useState((localStorage.getItem('token')))

  return (
    <>
      <LoginContext.Provider value={{ logindata, setlogindata }}>
        <BrowserRouter>
          <Routes>
            {
              logindata ?
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/chats" element={<Chat />} />
                  <Route path="/chatpage" element={<ChatPage />} />

                  

      
                </> :
                <>
                  <Route path="/" element={<LogIn />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/register" element={<RegisterForm />} />

                  <Route path='*' element={<h1>Page not found</h1>}></Route>
                </>
            }
          </Routes>
        </BrowserRouter>  
      </LoginContext.Provider>
    </>
  );
}

export default App;
