import { Module } from '@nestjs/common';
import { PixelsService } from './pixels.service';
import { PixelsController } from './pixels.controller';
import { TrackingModule } from 'src/tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  providers: [PixelsService],
  controllers: [PixelsController]
})
export class PixelsModule {}
