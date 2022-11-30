import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import {DiaryTagService} from "./diary-tag.service";
import {DiaryTag} from "../../schemas/diary-tag.schema";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('diary-tag')
export class DiaryTagController {

  constructor(
    private readonly diaryTagService: DiaryTagService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUpdate(@Request() req, @Body() tag: DiaryTag) {
    return this.diaryTagService.createUpdate(req.user.id, tag);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    return this.diaryTagService.getAll(req.user.id);
  }

}
