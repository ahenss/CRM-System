import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomer } from '../services/api';

const CustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await getCustomer(id);
                setCustomer(data);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };

        fetchCustomer();
    }, [id]);

    return (
        <div>
            <h1>Customer Details</h1>
            {customer ? (
                <div>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CustomerDetail;
