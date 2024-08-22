// backend/routes/opportunities.js

const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');

// Add a new opportunity
router.post('/', async (req, res) => {
    const { title, stage } = req.body;
    try {
        const newOpportunity = new Opportunity({ title, stage });
        await newOpportunity.save();
        res.status(201).json(newOpportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
