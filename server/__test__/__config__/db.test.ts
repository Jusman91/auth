import {
	mockDATABASE_URL,
	mockDataBaseUrl,
	mockMongoose,
} from '../__mocks__';

mockDataBaseUrl();
mockMongoose();

import mongoose from 'mongoose';
import connectToDB from '../../config/db';

describe('connectToDB', () => {
	it('should connect to the database successfully', async () => {
		(mongoose.connect as jest.Mock).mockResolvedValueOnce(
			null,
		);
		console.log = jest.fn();

		await connectToDB();

		expect(mongoose.connect).toHaveBeenCalledWith(
			mockDATABASE_URL,
		);
		expect(console.log).toHaveBeenCalledWith(
			'Connect to the mongoDB successfully',
		);
	});

	it('should log an error if connection fails', async () => {
		const error = new Error('connection error');
		(mongoose.connect as jest.Mock).mockRejectedValueOnce(
			error,
		);
		console.error = jest.fn();
		const processExitSpy = jest
			.spyOn(process, 'exit')
			.mockImplementation((number) => {
				throw new Error('process exit: ' + number);
			});

		await expect(connectToDB()).rejects.toThrow(
			'process exit: 1',
		);

		expect(mongoose.connect).toHaveBeenCalledWith(
			mockDATABASE_URL,
		);
		expect(console.error).toHaveBeenCalledWith(
			'could not connect to the database',
			error,
		);

		processExitSpy.mockRestore();
	});
});
