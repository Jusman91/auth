import connectToDB from './config/db';
import createServer from './lib/utils/server';

const app = createServer();

// server listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	connectToDB();
	console.log(`Server is running on ${PORT}`);
});
