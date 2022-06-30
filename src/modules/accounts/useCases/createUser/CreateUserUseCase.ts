import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({
        name,
        //username,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const emailAlreadyExists = await this.usersRepository.findByEmail(email)
        if(emailAlreadyExists) {
            throw new Error("This email is already in use")
        }

        await this.usersRepository.create({
            name,
            //username,
            email,
            password: passwordHash, 
            driver_license,
        });
    }
}

export { CreateUserUseCase }