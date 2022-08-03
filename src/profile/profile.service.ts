import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/model/user.model';
import { Repository } from 'typeorm';

export class ProfileService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {}
  async getInfoUser(id: number) {
    const firstUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id =:id', { id })
      .getOne();
    return firstUser;
  }
}
