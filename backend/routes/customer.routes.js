const express = require('express');
const Customer = require('../models/customer.model');
const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

// Add a new customer
router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;
    const newCustomer = new Customer({ name, email, phone });
    try {
        await newCustomer.save();
        res.json(newCustomer);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add customer' });
    }
});

// Edit a customer
router.put('/:id', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });
        res.json(customer);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update customer' });
    }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete customer' });
    }
});

module.exports = router;
