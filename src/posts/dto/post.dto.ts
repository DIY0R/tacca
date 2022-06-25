import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsString, Length } from 'class-validator';

export class PostDto {
  @IsString({ message: 'Должке быть строкой' })
  @Length(1, 100, { message: 'Должке быть больше 1' })
  title: string;
  @ArrayMinSize(1, { message: 'Теги должны быть больше 1' })
  @ArrayMaxSize(10, { message: 'Теги должны быть меньше 10' })
  teg: Array<string>;
  @IsString({ message: 'Должке быть строкой' })
  text: string;
}

export class PostDtoValid extends PostDto {
  messages: string[];
}
