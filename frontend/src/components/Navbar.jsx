import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate(); // Use navigate directly in React Router v6

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setToken(null); // Clear token from state
        navigate('/signin'); // Use navigate for redirection
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {token ? (
                    <>
                        <li><Link to="/create-rule">Create Rule</Link></li>
                        <li><Link to="/combine-rule">Combine Rules</Link></li>
                        <li><Link to="/modify-rule">Modify Rule</Link></li>
                        <li><Link to="/evaluate-rule">Evaluate Rule</Link></li>
                        <li><button onClick={handleSignOut}>Sign Out</button></li>
                    </>
                ) : (
                    <li><Link to="/signin">Sign In</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
