const mongoose = require('mongoose');

const uri = "mongodb+srv://ashikbhuyan17:yxOeHa3NrpDfXNWf@cluster.kglvkyr.mongodb.net/flone-ecommerce?retryWrites=true&w=majority";
const dbConnect = async () => {
  mongoose
    .connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
}

module.exports = dbConnect;