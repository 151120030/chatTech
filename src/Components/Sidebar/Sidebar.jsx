import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faSignal, faUsers, faPhone, faInfoCircle, faCog, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context';
import logo from '../../images/chat_logo.png'; // Ensure the path to your logo file is correct
import './sidebar.css'

const Sidebar = () => {
    const loginUserData = useContext(LoginContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        loginUserData.setlogindata(null);
        navigate('/');
    };

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src={logo} alt="Chatech Logo" className="logo logo_img" />
            
            </div>
            <div>
            <h6>ChaTech</h6>
            </div>
            <div className="nav-links">
                <NavLink to="/chats" activeClassName="active">
                    <FontAwesomeIcon icon={faCommentDots}  title="Chats" />
                </NavLink>
                <NavLink to="/home" activeClassName="active">
                    <FontAwesomeIcon icon={faHome}  title="Home" />
                </NavLink>
                <NavLink to="/status" activeClassName="active">
                    <FontAwesomeIcon icon={faSignal}  title="Status" />
                </NavLink>
                <NavLink to="/groups" activeClassName="active">
                    <FontAwesomeIcon icon={faUsers} title="Groups" />
                </NavLink>
                <NavLink to="/calls" activeClassName="active">
                    <FontAwesomeIcon icon={faPhone}  title="Calls" />
                </NavLink>
                {/* <NavLink to="/about" activeClassName="active">
                    <FontAwesomeIcon icon={faInfoCircle} title="About" />
                </NavLink> */}
                <NavLink to="/setting" activeClassName="active">
                    <FontAwesomeIcon icon={faCog}  title="Settings" />
                </NavLink>
            </div>
            <div className="logout-icon text-center">
                <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="icon logout-icon"
                    onClick={logout}
                    title="Logout"
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};

export default Sidebar;
