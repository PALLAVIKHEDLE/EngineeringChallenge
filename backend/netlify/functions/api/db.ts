//MongoDB connection setup 
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://root:password@localhost:27017/';


  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust this value as needed
  }as any);
  
const mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default mongoDb;