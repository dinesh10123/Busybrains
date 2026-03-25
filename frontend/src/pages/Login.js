import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const errorParam = urlParams.get('error');
        
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userData = {
                    username: decoded.sub,
                    role: 'ROLE_USER',
                    token: token
                };
                login(userData, token);
            } catch (err) {
                console.error('Invalid token in URL', err);
                setError('Failed to log in with Google');
            }
        } else if (errorParam) {
            setError(`Google Login Error: ${errorParam}`);
        }
    }, [login]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.login(username, password);
            login(res.data, res.data.token);
        } catch (err) {
            setError('Invalid credentials or server error');
        }
    };

    return (
        <div className="container" style={{maxWidth: '400px', marginTop: '100px'}}>
            <div className="glass" style={{padding: '40px'}}>
                <h2 style={{marginTop: 0}}>Login</h2>
                {error && <p style={{color: '#ff4b2b'}}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Sign In</button>
                </form>
                
                <div style={{margin: '20px 0', textAlign: 'center'}}>
                    <p style={{color: 'var(--text-muted)'}}>Or login with</p>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        <button className="btn glass" onClick={() => {
                            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
                            window.location.href = `${apiUrl.replace('/api', '')}/oauth2/authorization/google`;
                        }}>Google</button>
                    </div>
                </div>

                <p style={{textAlign: 'center', marginTop: '20px'}}>
                    Don't have an account? <Link to="/register" style={{color: 'var(--primary)'}}>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
