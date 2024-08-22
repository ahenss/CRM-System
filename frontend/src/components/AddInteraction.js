import React, { useState } from 'react';
import axios from 'axios';

const AddInteraction = () => {
    const [customerId, setCustomerId] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Ensure the customerId is a valid ObjectId
        if (!/^[0-9a-fA-F]{24}$/.test(customerId)) {
            setError('Invalid customer ID format.');
            return;
        }

        const interaction = {
            customerId,
            date: new Date(date).toISOString(),
            notes
        };

        try {
            await axios.post('http://localhost:5000/api/customers/interactions', interaction);
            alert('Interaction added successfully');
            setCustomerId('');
            setDate('');
            setNotes('');
            setError('');
        } catch (error) {
            console.error('Failed to add interaction:', error);
            setError(`Failed to add interaction: ${error.response.data.message}`);
        }
    };

    return (
        <div>
            <h1>Add Interaction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="customerId">Customer ID</label>
                    <input
                        type="text"
                        id="customerId"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <button type="submit">Add Interaction</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AddInteraction;
