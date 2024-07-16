import { mockDATABASE_URL } from './mock-data';

export const mockMongoose = () => {
	jest.mock('mongoose', () => ({
		connect: jest.fn(),
		set: jest.fn(),
	}));
};

export const mockDataBaseUrl = () => {
	jest.mock('../../config/env', () => ({
		DATABASE_URL: mockDATABASE_URL,
	}));
};
