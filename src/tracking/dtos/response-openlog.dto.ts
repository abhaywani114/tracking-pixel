import { ApiProperty } from '@nestjs/swagger';

export class ResponseOpenLogDto {
  @ApiProperty({
    description: 'Unique identifier for the open log entry',
    example: 'uuid-1',
  })
  id: string;

  @ApiProperty({
    description: 'IP address of the recipient who opened the email',
    example: '192.168.0.1',
  })
  ip: string;

  @ApiProperty({
    description: 'User agent string of the browser or email client used to open the email',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  })
  userAgent: string;

  @ApiProperty({
    description: 'Location of the recipient when the email was opened (if available)',
    example: 'New York, USA',
    nullable: true,
  })
  location: string | null;

  @ApiProperty({
    description: 'Whether the email was forwarded by the recipient',
    example: true,
  })
  forwarded: boolean;

  @ApiProperty({
    description: 'Email address of the person who received the forwarded email (if applicable)',
    example: 'forwarded@example.com',
    nullable: true,
  })
  forwardedEmail: string | null;

  @ApiProperty({
    description: 'Timestamp of when the email was opened',
    example: '2025-04-01T12:00:00.000Z',
  })
  openedAt: string;
}

