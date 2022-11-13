import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {DiaryTagService} from "./diary-tag.service";
import {DiaryTag} from "../../schemas/diary-tag.schema";

@Controller('diary-tag')
export class DiaryTagController {

  constructor(
    private readonly diaryTagService: DiaryTagService
  ) {
  }

  @Post()
  createUpdate(@Body() tag: DiaryTag) {
    return this.diaryTagService.createUpdate(tag);
  }

  @Get()
  getAll() {
    return this.diaryTagService.getAll();
  }

}
