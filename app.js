const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.use('/api/user/',userRouter);
app.use('/api/post',postRouter);

app.listen(5000, ()=>{
    console.log("listening on port 5000");
});