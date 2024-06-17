const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Niyati:Niya9533@cluster1.yhcv7ku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Create a schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    location: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors()); 
app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(__dirname, 'ForextEv')));

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.send({ message: 'Form submitted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error saving data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
