import { EntityRepository, Repository } from 'typeorm';

import { User } from '@/modules/users/domain/entities/user';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { generateUuidFactory } from '../../../main/factories/generate-id-factory';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findALl(): Promise<User[]> {
    return this.find();
  }

  async findById(id: string): Promise<User> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const baseUser = this.create({
      ...user,
      id: generateUuidFactory().generate(),
    });
    const createdUser = await this.save(baseUser);
    return createdUser;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const findedUser = await this.findById(id);
    const updatedUser = await this.save(Object.assign(findedUser, user));
    return updatedUser;
  }

  async deleteUserById(id: string): Promise<void> {
    const findedUser = await this.findById(id);
    await this.remove(findedUser);
  }
}