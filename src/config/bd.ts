import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tucanchaya', {
      // No se necesitan las opciones obsoletas como `useNewUrlParser` o `useUnifiedTopology`
    });
    console.log('MongoDB conectado');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred during database connection');
    }
    process.exit(1);
  }
};

export default connectDB;
