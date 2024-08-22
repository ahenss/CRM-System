import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../services/api';

const AddCustomer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomer({ name, email, phone });
            navigate('/');
        } catch (err) {
            console.error('Failed to add customer', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Customer</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Phone:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default AddCustomer;
