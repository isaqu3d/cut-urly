import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten-url')
  create(@Body('url') createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get(':shortCode')
  findOne(@Param('shortCode') id: string) {
    return this.urlService.findOne(+id);
  }
}
