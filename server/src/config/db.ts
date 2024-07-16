import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

mongoose.set('strictQuery', false);
const connectToDB = async () => {
	try {
		await mongoose.connect(`${DATABASE_URL}`);
		console.log('Connect to the mongoDB successfully');
	} catch (error) {
		console.error(
			'could not connect to the database',
			error,
		);
		process.exit(1);
	}
};

export default connectToDB;
