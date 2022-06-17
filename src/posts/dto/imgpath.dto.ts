import { IsString, isString } from 'class-validator'

class imgpathDto {
  @IsString({ message: 'Должке быть строкой' })
  imgpath: string
}

export class imgpathDtoValid extends imgpathDto {
  messages: string[]
}
