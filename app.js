const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

require("dotenv").config();


const cors = require('cors');

const MONGODB_URI = process.env.MONGO_USER;


const contactRoutes = require('./routes/contact');


const app = express();

app.use(cors());

app.use(bodyParser.json());


app.use('/contact', contactRoutes);


mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 8080, () => {
            console.log("connected");
        })
    })
    .catch(err => console.log(err));