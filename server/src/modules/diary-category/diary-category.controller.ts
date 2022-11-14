import {Body, Controller, Get, Post} from '@nestjs/common';
import {DiaryTag} from "../../schemas/diary-tag.schema";
import {DiaryCategoryService} from "./diary-category.service";
import {DiaryCategory} from "../../schemas/diary-category.schema";

@Controller('diary-category')
export class DiaryCategoryController {

  constructor(
    private readonly diaryCategoryService: DiaryCategoryService
  ) {
  }

  @Post()
  createUpdate(@Body() category: DiaryCategory) {
    return this.diaryCategoryService.createUpdate(category);
  }

  @Get()
  getAll() {
    return this.diaryCategoryService.getAll();
  }

}
