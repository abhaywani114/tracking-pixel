import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailTracking } from '../tracking/entities/email-tracking.entity';
import { Repository } from 'typeorm';
import { OpenLog } from '../tracking/entities/open-log.entity';
import { Request } from 'express';
import * as geoip from 'geoip-lite';

@Injectable()
export class PixelsService {
  constructor(
    @InjectRepository(EmailTracking) private readonly trackingRepo: Repository<EmailTracking>,
    @InjectRepository(OpenLog) private readonly openLogRepo: Repository<OpenLog>,
  ) {}

  /**
   * Track open event and return transparent pixel buffer
   */
  async trackAndServePixel(trackingHash: string, req: Request): Promise<Buffer> {
    const tracking = await this.trackingRepo.findOne({
      where: { trackingHash },
    });

    if (!tracking) {
      throw new NotFoundException('Invalid tracking hash');
    }

    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';

    const userAgent = req.headers['user-agent'] || 'unknown';

    const geo = geoip.lookup(ip || '') || undefined;
    const location = geo ? `${geo.city || ''}, ${geo.region || ''}, ${geo.country || ''}`: 'unknown';

      const openLog = new OpenLog({
        tracking,
        ip,
        userAgent,
        location,
        forwarded: false,
      });

      await this.openLogRepo.save(openLog);

    // Return 1x1 transparent PNG pixel
    return Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/IVY6nkAAAAASUVORK5CYII=', 'base64');
  }
}
