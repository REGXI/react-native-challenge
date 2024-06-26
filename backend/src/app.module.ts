import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {ChatsModule} from "./modules/chats/chats.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT),
            password: process.env.POSTGRES_PASSWORD,
            username: process.env.POSTGRES_USER,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        ChatsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
