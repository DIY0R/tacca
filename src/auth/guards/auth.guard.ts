import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const response = context.switchToHttp().getResponse()
    const request = context.switchToHttp().getRequest()
    if (!request.session.isAuth) return true
    response.redirect('/')
    return false
  }
}
