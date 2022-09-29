const express = require('express');
const app = express();
var cors = require('cors')
const path = require('path')

app.use(cors())
require('dotenv').config();
app.use(express.json());
var cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//routes
const authRoutes = require('./routes/user.routes');
const authAdminRoutes = require('./routes/admin/admin.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
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








