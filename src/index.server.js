const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

//routes
const authRoutes = require('./routes/user');
const authAdminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');


app.use('/api', authRoutes)
app.use('/api', authAdminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)



//database
require('../config/dbConnect')();



//port
port = process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
})
app.post('/data', (req, res) => {
    res.status(200).json({
        message: req.body
    })
})


app.listen(port, () => console.log(`Example app listening on port port! ${port}`))








