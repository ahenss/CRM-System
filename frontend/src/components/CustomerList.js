import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers, deleteCustomer } from '../services/api';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (err) {
                setError('Failed to fetch customers');
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (err) {
            console.error('Failed to delete customer', err);
        }
    };

    return (
        <div>
            <h2>Customer List</h2>
            <Link to="/add-customer">
                <button>Add Customer</button>
            </Link>
            {error && <p>{error}</p>}
            <ul>
                {customers.length > 0 ? (
                    customers.map(customer => (
                        <li key={customer._id}>
                            {customer.name} - {customer.email} - {customer.phone}
                            <Link to={`/edit-customer/${customer._id}`}>Edit</Link>
                            <button onClick={() => handleDelete(customer._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No customers found.</p>
                )}
            </ul>
        </div>
    );
};

export default CustomerList;
