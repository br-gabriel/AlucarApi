import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate"

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticate)
specificationsRoutes.post("/", createSpecificationController.handle)

export { specificationsRoutes }