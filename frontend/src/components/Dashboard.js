import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInteractions, getOpportunities } from '../services/api';

const Dashboard = () => {
    const [interactions, setInteractions] = useState([]);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const interactionsData = await getInteractions();
                const opportunitiesData = await getOpportunities();
                setInteractions(interactionsData);
                setOpportunities(opportunitiesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <Link to="/add-interaction">
                    <button>Add Interaction</button>
                </Link>
                <Link to="/add-opportunity">
                    <button>Add Opportunity</button>
                </Link>
            </nav>
            <h3>Interactions</h3>
            <ul>
                {interactions.map(interaction => (
                    <li key={interaction._id}>
                        {interaction.type} with {interaction.customerName} on {new Date(interaction.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
            <h3>Opportunities</h3>
            <ul>
                {opportunities.map(opportunity => (
                    <li key={opportunity._id}>
                        {opportunity.name} for {opportunity.customerName} at stage {opportunity.stage} on {new Date(opportunity.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
