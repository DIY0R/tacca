import * as express from 'express';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type MyResponse = Omit<express.Response, 'locals'> & {
  locals: {
    isAuth: boolean;
    user: { id: number };
  };
};

export type MyRequest = Omit<express.Response, 'locals'> & {
  session: {
    isAuth: boolean;
    user: { id: number; email: string; name: string };
  };
  flash: (token: string, args?: any) => string[];
};

export interface InterceptRequest extends express.Request {
  flash: (token: string, args?: any) => string[];
}
