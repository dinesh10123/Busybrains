import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/user/profile').then(res => setProfile(res.data));
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await api.post('/user/change-password', { newPassword });
            setMessage('Password updated successfully!');
            setNewPassword('');
        } catch (err) {
            setMessage('Error updating password');
        }
    };

    if (!profile) return <div className="container">Loading...</div>;

    return (
        <div className="container" style={{maxWidth: '600px'}}>
            <div className="glass" style={{padding: '30px'}}>
                <h2>User Profile</h2>
                <div style={{marginBottom: '30px'}}>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Role:</strong> <span className="badge">{profile.role}</span></p>
                </div>

                <hr style={{border: 'none', borderTop: '1px solid var(--border)', margin: '30px 0'}} />

                <h3>Change Password</h3>
                {message && <p style={{color: 'var(--primary)'}}>{message}</p>}
                <form onSubmit={handleChangePassword}>
                    <div className="input-group">
                        <label>New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
