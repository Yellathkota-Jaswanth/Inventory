const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => {
      console.log('Connected to Mongo!');
  })
  .catch((err) => {
      console.error('Error connecting to Mongo', err);
  });
};

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
