import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import AddInteraction from './components/AddInteraction';
import AddOpportunity from './components/AddOpportunity';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <div>
                <h1>CRM System</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Customer List</Link></li>
                        <li><Link to="/add-customer">Add Customer</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<CustomerList />} />
                    <Route path="/add-customer" element={<AddCustomer />} />
                    <Route path="/edit-customer/:id" element={<EditCustomer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
