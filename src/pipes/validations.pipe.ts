import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  ValidationError,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipeGlobal implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const object = plainToClass(metadata.metatype, value)
    if (!(typeof object == 'object')) return value
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
