// routes/interactionRoutes.js

const express = require('express');
const router = express.Router();
const Interaction = require('../models/Interaction');

// Add an interaction
router.post('/', async (req, res) => {
  try {
    const interaction = new Interaction(req.body);
    await interaction.save();
    res.status(201).json(interaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get interactions by customer ID
router.get('/:customerId', async (req, res) => {
  try {
    const interactions = await Interaction.find({ customerId: req.params.customerId });
    res.status(200).json(interactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an interaction
router.delete('/:id', async (req, res) => {
  try {
    await Interaction.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
