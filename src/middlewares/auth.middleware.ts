import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { MyResponse, MyRequest } from '../types/response';

export class AuthCheckMiddleware {
  static check(req: any, res: any, next: NextFunction) {
    res.locals.isAuth = req.session.isAuth;
    console.log('\x1b[43m%s\x1b[0m', 'req.session.user', req.session.user);
    res.locals.user = req.session.user;
    next();
  }
}
