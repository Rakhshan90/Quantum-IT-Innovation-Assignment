const express = require('express');
const dbConnect = require('./config/db/dbConnect');
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouter');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

dotenv.config();
const app = express();
dbConnect();

/*
This express middleware is responsible for parsing the incoming json data into req.body
It makes data available to req.body 
*/ 
app.use(express.json());

// user router
app.use('/api/users', userRouter);

// middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});