import { Response, Request } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        try {
            await this.createCategoryUseCase.execute({ name, description });
        } catch (err) {
            return response.status(400).json({message: (err as Error).message});
        }        

        return response.status(201).send();
    }
}

export { CreateCategoryController }