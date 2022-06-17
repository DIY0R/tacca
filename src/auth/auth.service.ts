import { Inject, Injectable, Res } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { MyResponse } from 'src/types/response'
import { Repository } from 'typeorm'
import { LoginDto, LoginDtoValid } from './dto/login.dto'
import { RegistrationDto, RegistrationDtoValid } from './dto/registration.dto'
import { Session } from './model/session'
import { Users } from './model/user.model'
import * as bcrypt from 'bcryptjs'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {}

  async registration(registrationDto: RegistrationDtoValid, session, req, res) {
    if (registrationDto?.messages) {
      req.flash('info', registrationDto?.messages)
      console.log(registrationDto)
      return res.redirect('/auth/registration')
    }
    const candidate = await this.usersRepository.findOne({
      where: { email: registrationDto.email },
    })
    const { email, password, name } = registrationDto

    if (candidate) {
      req.flash('info', 'такой пользователь уже авторизован')
      return  res.redirect('/auth/registration')
    }
    const hashPassword = await bcrypt.hash(password, 5)
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
      .execute()
    return new Promise((resolve) => {
      session.isAuth = true
      session.user = user
      session.save(() => {
        resolve(true)
        res.redirect('/')
      })
    })
  }

  logout(session) {
    return new Promise((res) => {
      session.destroy(() => {
        res(true)
      })
    })
  }

  async login(loginDto: LoginDtoValid, session, req, res) {
    if (loginDto?.messages) {
      req.flash('messages', loginDto?.messages)
      return res.redirect('/auth/login')
    }
    const candidate = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    })
    if(candidate){
      req.flash('messages', ['вы не прошли авторизацию'])
     return  res.redirect('/auth/login')
    }
    const users: any = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id: candidate?.id ?? 0 })
      .select('user.id', 'id')
      .addSelect('user.password')
      .getMany()
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      users[0].password || ''
    )

    if (passwordEquals) {
      return new Promise((resolve) => {
        session.isAuth = true
        session.user = candidate
        session.save(() => {
          res.redirect('/')
          resolve(true)
        })
      })
    }
    req.flash('messages', ['вы не прошли авторизацию'])
    res.redirect('/auth/login')
  }

  @Cron('0 0 */1 * * *')
  sessionClean() {
    this.sessionRepository
      .createQueryBuilder()
      .delete()
      .where('updated_at <= :date', {
        date: new Date((new Date() as number | any) - 10 * 350000),
      })
      .execute()
  }
}
//350000
