import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenLog } from './entities/open-log.entity';
import { EmailTracking } from './entities/email-tracking.entity';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTracking, OpenLog])],
  providers: [TrackingService],
  controllers: [TrackingController],
  exports: [TrackingService, TypeOrmModule],
})
export class TrackingModule {}
