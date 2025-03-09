//const express = require('express'); // CJS CommonJS
import express from 'express'; // ESM EcmaScript Module
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World desde express')
})

app.get('/ecommerce', (req, res) => {
    res.send('Hello World desde ecommerce')
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})