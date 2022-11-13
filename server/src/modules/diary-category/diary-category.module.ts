import { Module } from '@nestjs/common';
import { DiaryCategoryController } from './diary-category.controller';
import { DiaryCategoryService } from './diary-category.service';

@Module({
  controllers: [DiaryCategoryController],
  providers: [DiaryCategoryService]
})
export class DiaryCategoryModule {}
