import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

export const getCustomers = async () => {
    return await axios.get(API_URL);
};

export const createCustomer = async (customer) => {
    return await axios.post(API_URL, customer);
};

export const deleteCustomer = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const getCustomerById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const updateCustomer = async (id, customer) => {
    return await axios.put(`${API_URL}/${id}`, customer);
};

// src/services/api.js

const BASE_URL = 'http://localhost:5000';

export const addInteraction = async (interaction) => {
    const response = await fetch(`${BASE_URL}/interactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(interaction),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const addOpportunity = async (opportunity) => {
    const response = await fetch(`${BASE_URL}/opportunities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(opportunity),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Add these new functions to your existing code:
export const getInteractions = async () => {
    const response = await fetch(`${BASE_URL}/interactions`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const getOpportunities = async () => {
    const response = await fetch(`${BASE_URL}/opportunities`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
