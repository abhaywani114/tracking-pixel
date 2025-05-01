import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmailTrackingDto } from './dtos/create-email-tracking-dto';
import { TrackingService } from './tracking.service';
import { ResponseCreateEmailTrackingDto } from './dtos/response-create-email-tracking.dto';
import { ResponseEmailTrackingDto } from './dtos/response-email-tracking.dto';
import { ConfigService } from '@nestjs/config';

@Controller('tracking')
@ApiTags('Tracking Service')
export class TrackingController {
  constructor(
    private readonly emailTrackingService: TrackingService,
    private readonly configService: ConfigService,
  ) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate a tracking hash for the email' })
  @ApiResponse({ status: 201, description: 'Tracking hash generated successfully', type: ResponseCreateEmailTrackingDto })
  async generateTrackingHash(@Body() createEmailTrackingDto: CreateEmailTrackingDto ): Promise<ResponseCreateEmailTrackingDto> {
    const emailTracking = await this.emailTrackingService.generateTrackingHash(
      createEmailTrackingDto,
    );

    return {
      id: emailTracking.id,
      trackingHash: emailTracking.trackingHash,
      originalEmail: emailTracking.originalEmail,
      campaign: emailTracking.campaign,
      createdAt: emailTracking.createdAt.toISOString(),
      htmlEmbedCode: this.generateTrackingPixelEmbedCode(emailTracking.trackingHash),
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get a list of all generated tracking hashes with email info' })
  @ApiResponse({ status: 200, description: 'List of tracking hashes with email details retrieved successfully', type: [ResponseCreateEmailTrackingDto]  })
  async getAllTrackingHashes(): Promise<ResponseCreateEmailTrackingDto[]> {
    const emailTrackings = await this.emailTrackingService.getAllTrackingHashesWithInfo();

    return emailTrackings.map((emailTracking) => ({
      id: emailTracking.id,
      trackingHash: emailTracking.trackingHash,
      originalEmail: emailTracking.originalEmail,
      campaign: emailTracking.campaign,
      createdAt: emailTracking.createdAt.toISOString(),
      htmlEmbedCode: this.generateTrackingPixelEmbedCode(emailTracking.trackingHash),
    }));
  }

  @Get(':trackingHash')
  @ApiOperation({ summary: 'Get tracking data by tracking hash' })
  @ApiResponse({ status: 200, description: 'Tracking data retrieved successfully', type: ResponseEmailTrackingDto })
  async getTrackingData(@Param('trackingHash') trackingHash: string): Promise<ResponseEmailTrackingDto> {
    const emailTracking = await this.emailTrackingService.getTrackingData(trackingHash);
    if (!emailTracking) throw new HttpException('Tracking data not found', HttpStatus.NOT_FOUND);

    return {
      id: emailTracking.id,
      trackingHash: emailTracking.trackingHash,
      originalEmail: emailTracking.originalEmail,
      campaign: emailTracking.campaign,
      createdAt: emailTracking.createdAt.toISOString(),
      opens: emailTracking.opens.map((openLog) => ({
        id: openLog.id,
        ip: openLog.ip,
        userAgent: openLog.userAgent,
        location: openLog.location,
        forwarded: openLog.forwarded,
        forwardedEmail: openLog.forwardedEmail,
        openedAt: openLog.openedAt.toISOString(),
      })),
    };
  }

  private generateTrackingPixelEmbedCode(trackingHash: string): string {
    const baseUrl = this.configService.get('PIXEL_BASE_URL') || 'https://yourdomain.com';
    return `<img src='${baseUrl}/pixels/${trackingHash}' width='1' height='1' style='display:none;' />`;
  }
}
