import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ExceptionsData, ExceptionsDataInterface } from './exeptions.data'

@Catch(HttpException)
export class HttpExceptionGlobal {
  exceptionsData: ExceptionsDataInterface = ExceptionsData

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const currentData = this.exceptionsData[status]
    const currentException = currentData
      ? response.render(currentData.page, currentData.data)
      : response.json({ status })
  }
}
