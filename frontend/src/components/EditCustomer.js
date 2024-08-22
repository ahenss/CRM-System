import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, updateCustomer } from '../services/api';

const EditCustomer = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getCustomerById(id);
                const { name, email, phone } = response.data;
                setName(name);
                setEmail(email);
                setPhone(phone);
            } catch (err) {
                console.error('Failed to fetch customer', err);
            }
        };

        fetchCustomer();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCustomer(id, { name, email, phone });
            navigate('/');
        } catch (err) {
            console.error('Failed to update customer', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Customer</h2>
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
            <button type="submit">Update Customer</button>
        </form>
    );
};

export default EditCustomer;
