const mongoose =require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.db);
    console.log("Connected to MongoDB",`${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message,`${mongoose.connection.host}`,process.env.db);
  }
};

//  const connection =  mongoose.connect(process.env.db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

 module.exports = connection;
