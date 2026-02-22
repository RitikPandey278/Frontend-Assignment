import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {

        await API.post('/auth/register', formData);

        const res = await API.post('/auth/login', {
            email: formData.email,
            password: formData.password
        });

        localStorage.setItem("token", res.data.token);

        navigate('/dashboard');

    } catch (err) {
        console.log(err)

        alert("Error in registration");

    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input type="text" placeholder="Name" className="w-full p-2 mb-4 border" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full p-2 mb-4 border" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" className="w-full p-2 mb-4 border" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;