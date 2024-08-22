import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addOpportunity } from '../services/api';

function AddOpportunity() {
    const [opportunity, setOpportunity] = useState({ title: '', value: '', stage: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOpportunity(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addOpportunity(opportunity);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding opportunity:', error);
        }
    };

    return (
        <div>
            <h2>Add Opportunity</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={opportunity.title} onChange={handleChange} required />
                </label>
                <label>
                    Value:
                    <input type="number" name="value" value={opportunity.value} onChange={handleChange} required />
                </label>
                <label>
                    Stage:
                    <input type="text" name="stage" value={opportunity.stage} onChange={handleChange} required />
                </label>
                <button type="submit">Add Opportunity</button>
            </form>
        </div>
    );
}

export default AddOpportunity;
