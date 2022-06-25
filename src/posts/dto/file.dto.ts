import { Length } from 'class-validator';

export class FileType {
  @Length(1, 100, { message: 'Должке быть больше 1' })
  fieldname: string;
}
