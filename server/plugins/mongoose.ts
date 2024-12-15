import { connectDb } from '../db/index';

export default defineNitroPlugin(async () => {
  try {
    await connectDb();
    console.log('MongoDB connection initialized via Nitro Plugin');
  } catch (error) {
    console.error('Error during MongoDB initialization:', error);
  }
});
