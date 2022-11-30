import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {DiaryTag} from "../../schemas/diary-tag.schema";
import {DiaryCategoryService} from "./diary-category.service";
import {DiaryCategory} from "../../schemas/diary-category.schema";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('diary-category')
export class DiaryCategoryController {

  constructor(
    private readonly diaryCategoryService: DiaryCategoryService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUpdate(@Request() req, @Body() category: DiaryCategory) {
    return this.diaryCategoryService.createUpdate(req.user.id, category);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    return this.diaryCategoryService.getAll(req.user.id);
  }

}
