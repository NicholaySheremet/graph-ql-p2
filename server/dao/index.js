const mongoose = require('mongoose');

const connectDB = async () => {
  const db = await mongoose.connect(process?.env?.MONGO_URL);

  console.log(`DB connected: ${db.connection.host}`);
}

module.exports = connectDB;
