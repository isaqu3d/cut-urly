import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlService {
  create(createUrlDto: CreateUrlDto) {
    return 'This action adds a new url';
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }
}
