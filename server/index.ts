import { PORT } from './config';
import connectToDB from './config/db';
import createServer from './lib/utils/server';

const app = createServer();

// server listening on port
app.listen(PORT, () => {
	connectToDB();
	console.log(`Server is running on ${PORT}`);
});
