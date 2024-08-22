const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    date: { type: Date, required: true },
    notes: { type: String, required: true }
});

module.exports = mongoose.model('Interaction', interactionSchema);
