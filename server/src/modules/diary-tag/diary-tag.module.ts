import { Module } from '@nestjs/common';
import { DiaryTagController } from './diary-tag.controller';
import { DiaryTagService } from './diary-tag.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DiaryTag, DiaryTagSchema} from "../../schemas/diary-tag.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: DiaryTag.name, schema: DiaryTagSchema}
    ])
  ],
  controllers: [DiaryTagController],
  providers: [DiaryTagService]
})
export class DiaryTagModule {}
