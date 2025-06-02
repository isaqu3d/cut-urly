import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createUrlDto: CreateUrlDto) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3333';

    const existing = await this.urlRepository.findOneBy({
      originalUrl: createUrlDto.url,
    });

    if (existing) {
      return { url: `${baseUrl}/${existing.shortCode}` };
    }

    let shortCode: string;
    let existingCode: Url | null;

    do {
      shortCode = this.generateShortCode(6);
      existingCode = await this.urlRepository.findOneBy({ shortCode });
    } while (existingCode);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const url = this.urlRepository.create({
      originalUrl: createUrlDto.url,
      shortCode,
      expiresAt,
    });

    await this.urlRepository.save(url);

    return { url: `${baseUrl}/${shortCode}` };
  }

  async findOne(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findOneBy({ shortCode });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    if (url.expiresAt < new Date()) {
      throw new NotFoundException('URL has expired');
    }
    return url.originalUrl;
  }
}
