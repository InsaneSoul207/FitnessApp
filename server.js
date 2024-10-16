const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/premium', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/premium.html'));
});

app.get('/goals', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/goals.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
