import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as hbs from 'express-handlebars'
import * as session from 'express-session'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AuthCheckMiddleware } from './middlewares/auth.middleware'
import * as flash from 'connect-flash'
import * as cookieParser from 'cookie-parser'
import { ValidationPipeGlobal } from './pipes/validations.pipe'
import { HttpExceptionGlobal } from './exceptions/HttpExceptionGlobal'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(join(__dirname, '..', 'public')) 
  app.setBaseViewsDir(join(__dirname, '..', 'views'))  
  app.use(cookieParser('heee'))
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
 
      cookie: {
        maxAge: 3500000,
      },
    })
  )
  app.use(flash())
  app.use(AuthCheckMiddleware.check)
  app.engine(
    'hbs',
    hbs.engine({
      defaultLayout: 'app',
      extname: '.hbs',
      helpers: {
        lengthChek: function (value) {
          return value > 10 ? 'true' : 'false'
        },
      },
    })
  )
  app.setViewEngine('hbs')
  app.useGlobalFilters(new HttpExceptionGlobal())
  app.useGlobalPipes(new ValidationPipeGlobal())
  await app.listen(5000)
}
bootstrap()
