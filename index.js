import express from 'express'; // ESM EcmaScript Module
const app = express();
const port = process.env.port || 4000;
app.get('/', (req, res) => {
    res.send('Hello World desde express')
})

app.get('/ecommerce', (req, res) => {
    res.send('Hello World desde ecommerce')
})

app.listen(port, () => {
    console.log('Server is running on port:', port);
})