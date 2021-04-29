import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UsersRepository"



class UserService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
    }

    async create(email: string) {
        // Verificar se o usuario existe 
        const userExists = await this.userRepository.findOne({
            email,
        })

        // Se nao existir, salvar no DB
        if(userExists){
            return userExists
        }

        const user = this.userRepository.create({
            email,
        })

        await this.userRepository.save(user)

        // Se existir, retornar user 
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });

        return user 
    }
}

export { UserService }