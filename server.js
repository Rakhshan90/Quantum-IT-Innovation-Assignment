const express = require('express');
const dbConnect = require('./config/db/dbConnect');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
dbConnect();

app.get('/', (req, res)=>{
    res.status(200).send("Welcome to the assignment!")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});