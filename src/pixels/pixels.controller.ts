import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PixelsService } from './pixels.service';
import { Request, Response } from 'express';

@Controller('pixels')
  @ApiTags('Pixel Service')
export class PixelsController {

  constructor(private readonly pixelService: PixelsService) {}

  @Get(':trackingHash')
  @ApiOperation({ summary: 'Serve tracking pixel and log email open' })
  @ApiResponse({ status: 200, description: 'Serves images' })
  async servePixel(@Param('trackingHash') trackingHash: string, @Req() req: Request, @Res() res ) {
    const buffer = await this.pixelService.trackAndServePixel(trackingHash, req);
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(buffer);
  }
}
