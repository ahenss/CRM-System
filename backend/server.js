const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This is required to parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Customer model
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: String,
    email: String
}));

// Interaction Schema
const interactionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    date: Date,
    notes: String,
});

// Interaction Model
const Interaction = mongoose.model('Interaction', interactionSchema);

// Routes
app.post('/api/customers', async (req, res) => {
    const { name, email } = req.body;
    try {
        const newCustomer = new Customer({ name, email });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/customers/interactions', async (req, res) => {
    const { customerId, date, notes } = req.body;

    // Validate customerId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({ message: 'Invalid customer ID' });
    }

    try {
        const interaction = new Interaction({ customerId, date, notes });
        await interaction.save();
        res.status(201).json(interaction);
    } catch (error) {
        console.error('Error adding interaction:', error);
        res.status(500).send('Server error');
    }
});



app.listen(5000, () => {
    console.log('Server running on port 5000');
});
