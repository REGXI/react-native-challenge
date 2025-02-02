import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {ResponseInterceptor} from "./shared/response.interceptor";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    const config = new DocumentBuilder()
        .setTitle('Challenge API')
        .setDescription('Challenge API Doc')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description: 'Default JWT Authorization',
                type: 'http',
                in: 'header',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'access-token',
        )
        .addTag('Challenge')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    })

    app.useGlobalInterceptors(new ResponseInterceptor())
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)
}

bootstrap()
