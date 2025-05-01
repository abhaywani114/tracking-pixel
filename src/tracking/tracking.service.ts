import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailTracking } from './entities/email-tracking.entity';
import { Repository } from 'typeorm';
import { CreateEmailTrackingDto } from './dtos/create-email-tracking-dto';
import { v4 as uuidv4 } from 'uuid'
import { OpenLog } from './entities/open-log.entity';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(EmailTracking) private readonly emailTrackingRepository: Repository<EmailTracking>,

    @InjectRepository(OpenLog) private readonly openLogRepository: Repository<OpenLog>,
  ) {}

  async generateTrackingHash( createEmailTrackingDto: CreateEmailTrackingDto ): Promise<EmailTracking> {
    const { originalEmail, campaign } = createEmailTrackingDto;

    // Generate a unique tracking hash (UUID)
    const trackingHash = uuidv4();

    // Create a new EmailTracking instance
    const emailTracking = this.emailTrackingRepository.create({
      trackingHash,
      originalEmail,
      campaign,
    });

    // Save the email tracking record to the database
    await this.emailTrackingRepository.save(emailTracking);

    return emailTracking;
  }

  async getAllTrackingHashesWithInfo(): Promise<EmailTracking[]> {
    return this.emailTrackingRepository.find({
      select: ['id', 'trackingHash', 'originalEmail', 'campaign', 'createdAt'], // Only select required fields
    });
  }

  async getTrackingData(trackingHash: string): Promise<EmailTracking | null> {
    return this.emailTrackingRepository.findOne({
      where: { trackingHash },
      relations: ['opens'],
    });
  }
}
