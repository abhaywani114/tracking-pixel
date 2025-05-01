import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        url: configService.getOrThrow('POSTGRES_URI'),
        synchronize: true,
        autoLoadEntities: true
      })
    })
  ]
})
export class DatabaseModule {}
