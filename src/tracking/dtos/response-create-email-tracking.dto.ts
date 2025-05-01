import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateEmailTrackingDto {
  @ApiProperty({
    description: 'Unique identifier for the tracking record',
    example: 'some-uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Generated tracking hash for the email',
    example: 'generated-uuid',
  })
  @IsString()
  trackingHash: string;

  @ApiProperty({
    description: 'The HTML embed code for the tracking pixel, typically an <img> tag',
    example: "<img src='https://yourdomain.com/pixel/abc123' width='1' height='1' />",
  })
  @IsString()
  htmlEmbedCode: string;

  @ApiProperty({
    description: 'Original email address that is being tracked',
    example: 'example@example.com',
  })
  @IsString()
  originalEmail: string;

  @ApiProperty({
    description: 'Campaign name associated with the email tracking',
    example: 'Summer Campaign 2025',
    required: false,
  })
  @IsOptional()
  @IsString()
  campaign?: string;

  @ApiProperty({
    description: 'Timestamp when the tracking record was created',
    example: '2025-05-01T00:00:00.000Z',
  })
  @IsDateString()
  createdAt: string;
}
