import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateEntryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  mood: string;

  @IsOptional()
  @IsString()
  tags: string[];

  @IsOptional()
  @IsBoolean()
  public: boolean;
}

