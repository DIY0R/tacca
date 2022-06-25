import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Должке быть строкой' })
  @Length(4, 100, { message: 'Должке быть больше 4' })
  @IsEmail({}, { message: 'Не коректный email!' })
  email: string;
  @IsString({ message: 'Должке быть строкой' })
  @Length(5, 50, { message: 'Должке быть больше 5' })
  password: string;
}

export class LoginDtoValid extends LoginDto {
  messages: string[];
}
