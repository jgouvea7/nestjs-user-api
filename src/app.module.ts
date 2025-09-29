import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/infrastructure/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/domain/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User],
      synchronize: true,
    })
    ,UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
