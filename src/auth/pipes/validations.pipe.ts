import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  ValidationError,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { LoginDto, LoginDtoValid } from '../dto/login.dto'
@Injectable()
export class LoginValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    console.log(value)
    const object = plainToClass(metadata.metatype, value)
    if (!!!object) return value
    const errors: ValidationError[] = await validate(object || null)

    if (errors.length > 0) {
      return {
        ...value,
        valueFile: true,
        messages: errors.map((err) =>
          Object.values(err.constraints).join(',')
        ) as string[],
      }
    }
    return value
  }
}
