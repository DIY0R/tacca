import { IsEmail, IsString, Length } from 'class-validator';

export class RegistrationDto {
  @Length(5, 50, { message: 'Должке быть больше 5' })
  name: string;
  @IsString({ message: 'Должке быть строкой' })
  @Length(4, 100, { message: 'Должке быть больше 4' })
  @IsEmail({}, { message: 'Не коректный email!' })
  email: string;
  @Length(5, 50, { message: 'Должке быть больше 5' })
  password: string;
  @Length(5, 50, { message: 'Должке быть больше 5' })
  re_password: string;
}

export class RegistrationDtoValid extends RegistrationDto {
  messages: string[];
}
