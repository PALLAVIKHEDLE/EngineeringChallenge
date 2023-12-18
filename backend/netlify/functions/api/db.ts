import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://pallavi8khedle:pallavi%403Esoft@cluster0.juonjhy.mongodb.net/';

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust this value as needed
  }as any);
  
const mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default mongoDb;