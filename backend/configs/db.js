const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Failed to connect to Database:", error.message);
  }
};

module.exports = connectToDB;
