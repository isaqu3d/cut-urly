import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}

  private generateShortCode(length = 6): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';

    for (let i = 0; i < length; i++) {
      shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return shortCode;
  }

  create(createUrlDto: CreateUrlDto) {
    return 'This action adds a new url';
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }
}
