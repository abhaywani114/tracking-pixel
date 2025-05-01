import { ApiProperty } from "@nestjs/swagger";
import { ResponseOpenLogDto } from "./response-openlog.dto";

export class ResponseEmailTrackingDto {
  @ApiProperty({ description: 'ID of the email tracking' })
  id: string;

  @ApiProperty({ description: 'Tracking hash for the email' })
  trackingHash: string;

  @ApiProperty({ description: 'Original email address' })
  originalEmail: string;

  @ApiProperty({ description: 'Campaign name' })
  campaign: string;

  @ApiProperty({ description: 'Creation date of the tracking' })
  createdAt: string;

  @ApiProperty({
    description: 'List of open logs associated with the email tracking',
    type: [ResponseOpenLogDto],
  })
  opens: ResponseOpenLogDto[];
}
