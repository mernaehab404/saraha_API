import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/verify-otp', { email, otp });
            console.log(response.data); // Handle success message
            // Redirect or show success message
        } catch (error) {
            console.error('Error verifying OTP:', error);
            // Handle error response from server
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
            <label>OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <br />
            <button type="submit">Verify Email</button>
        </form>
    );
};

export default VerifyEmail;
