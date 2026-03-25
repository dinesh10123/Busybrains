import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData.username, formData.email, formData.password, formData.role);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container" style={{maxWidth: '400px', marginTop: '100px'}}>
            <div className="glass" style={{padding: '40px'}}>
                <h2 style={{marginTop: 0}}>Register</h2>
                {error && <p style={{color: '#ff4b2b'}}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    <div className="input-group">
                        <label>Role</label>
                        <select 
                            style={{width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--border)', borderRadius: '8px'}}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                        >
                            <option value="user" style={{background: '#0f172a'}}>User</option>
                            <option value="admin" style={{background: '#0f172a'}}>Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Sign Up</button>
                </form>
                <p style={{textAlign: 'center', marginTop: '20px'}}>
                    Already have an account? <Link to="/login" style={{color: 'var(--primary)'}}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
