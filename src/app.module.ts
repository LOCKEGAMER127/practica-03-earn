import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaModule } from './cita/cita.module';
import { Cita } from './cita/entities/cita.entity';
import { User } from './auth/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      autoloadEntities: true,
      synchronize: true,
      ssl: {rejectUnauthorized: false,
      },
       entities: [Cita, User],
    }),
  }),
    AuthModule,
    CitaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
