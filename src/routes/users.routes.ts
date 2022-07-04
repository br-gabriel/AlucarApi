import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import multer from "multer"
import uploadConfig from "../config/upload"

const usersRouter = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

usersRouter.post("/", createUserController.handle);
usersRouter.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { usersRouter }