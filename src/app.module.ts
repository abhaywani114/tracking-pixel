import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TrackingModule } from './tracking/tracking.module';
import { PixelsModule } from './pixels/pixels.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, TrackingModule, PixelsModule],
})
export class AppModule {}
