import { Inject, Injectable, Res } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MyResponse } from 'src/types/response';
import { Repository } from 'typeorm';
import { LoginDto, LoginDtoValid } from './dto/login.dto';
import { RegistrationDto, RegistrationDtoValid } from './dto/registration.dto';
import { Session } from './model/session';
import { Users } from './model/user.model';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {}

  logout(session) {
    return new Promise((res) => {
      session.destroy(() => {
        res(true);
      });
    });
  }

  async login(loginDto: LoginDtoValid, req) {
    if (loginDto?.messages) return req.flash('messages', loginDto?.messages);

    const candidate = await this.getUser(loginDto);

    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      candidate.password || ''
    );
    if (!passwordEquals)
      return req.flash('messages', ['вы не прошли авторизацию']);
    const { password, ...user } = candidate;
    return user;
  }

  private async getUser(loginDto: LoginDtoValid) {
    const candidate = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id: candidate?.id })
      .select('user.id', 'id')
      .addSelect('user.password')
      .getMany();
    return { ...candidate, password: user[0]?.password };
  }

  async registration(registrationDto: RegistrationDtoValid, session, req, res) {
    if (registrationDto?.messages) {
      req.flash('info', registrationDto?.messages);
      console.log(registrationDto);
      return res.redirect('/auth/registration');
    }
    const candidate = await this.usersRepository.findOne({
      where: { email: registrationDto.email },
    });
    const { email, password, name } = registrationDto;

    if (candidate) {
      req.flash('info', 'такой пользователь уже авторизован');
      return res.redirect('/auth/registration');
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([
        {
          email,
          name,
          password: hashPassword,
        },
      ])
      .execute();
    return new Promise((resolve) => {
      session.isAuth = true;
      session.user = user;
      session.save(() => {
        resolve(true);
        res.redirect('/');
      });
    });
  }
}
//350000
