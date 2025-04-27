const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Middleware for Basic Auth
function basicAuth(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).send('Authentication required.');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (
        username === process.env.USERNAME &&
        password === process.env.PASSWORD
    ) {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).send('Invalid credentials.');
    }
}

// Public route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Protected route
app.get('/secret', basicAuth, (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

