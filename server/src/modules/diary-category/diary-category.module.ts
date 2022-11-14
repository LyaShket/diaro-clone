import { Module } from '@nestjs/common';
import { DiaryCategoryController } from './diary-category.controller';
import { DiaryCategoryService } from './diary-category.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DiaryCategory, DiaryCategorySchema} from "../../schemas/diary-category.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: DiaryCategory.name, schema: DiaryCategorySchema}
    ])
  ],
  controllers: [DiaryCategoryController],
  providers: [DiaryCategoryService]
})
export class DiaryCategoryModule {}
