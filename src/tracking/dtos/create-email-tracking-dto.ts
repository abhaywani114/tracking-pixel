import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailTrackingDto {
  @ApiProperty({
    description: 'The email address to track',
    example: 'example@example.com',
  })
  @IsEmail()
  originalEmail: string;

  @ApiProperty({
    description: 'Optional campaign name for tracking',
    example: 'Summer Campaign 2025',
    required: false,
  })
  @IsOptional()
  @IsString()
  campaign?: string;
}
