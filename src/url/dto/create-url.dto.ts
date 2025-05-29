import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty({ message: 'URL cannot be empty' })
  @IsUrl({}, { message: 'Invalid URL format' })
  url: string;
}
