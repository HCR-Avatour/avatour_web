// Backend server using Express.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

var bodyString = '';

app.use(express.json());
// add cors
const cors = require('cors');
app.use(cors());

// Endpoint to handle incoming POST requests
// where the pipeline sends the msg
app.post('/', (req, res) => {
  console.log('Received HTTP request:', req);
  res.status(200).send('Request received successfully');
  bodyString = req.body;
});

// sending to the react app
app.post('/log', (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    console.log('Received HTTP request:', "bodyString");
    // res.status(200).send('Request received successfully');
    res.status(200).send("bodyString");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
