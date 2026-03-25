import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Busybrains</Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/dashboard">Explore</Link>
                        <Link to="/profile">Profile</Link>
                        {isAdmin && <span className="badge" style={{background: 'rgba(139, 92, 246, 0.2)', border: '1px solid var(--primary)'}}>Admin</span>}
                        <button onClick={logout} className="btn btn-outline" style={{padding: '8px 20px', fontSize: '0.85rem'}}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Sign In</Link>
                        <Link to="/register" className="btn btn-primary" style={{padding: '10px 24px'}}>Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
