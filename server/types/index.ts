import { NextFunction, Request, Response } from 'express';

export interface IControllerParams {
	req: Request;
	res: Response;
	next: NextFunction;
}
