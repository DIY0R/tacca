import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { MyResponse, MyRequest } from '../types/response'

export class AuthCheckMiddleware {
  static check(req: any, res: any, next: NextFunction) {
    res.locals.isAuth = req.session.isAuth
    res.locals.user = req.session.user
    next()
  }
}
