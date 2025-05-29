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

  async create(createUrlDto: CreateUrlDto) {
    let shortCode: string;
    let existingUrl: Url | null;

    do {
      shortCode = this.generateShortCode(6);
      existingUrl = await this.urlRepository.findOneBy({ shortCode });
    } while (existingUrl);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const url = this.urlRepository.create({
      originalUrl: createUrlDto.url,
      shortCode,
      expiresAt,
    });

    await this.urlRepository.save(url);

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    return { url: `${baseUrl}/${shortCode}` };
  }

  async findOne(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findOneBy({ shortCode });

    if (!url) {
      throw new Error('URL not found');
    }

    if (url.expiresAt < new Date()) {
      throw new Error('URL has expired');
    }
    return url.originalUrl;
  }
}
