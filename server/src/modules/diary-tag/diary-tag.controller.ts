import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import {DiaryTagService} from "./diary-tag.service";
import {DiaryTag} from "../../schemas/diary-tag.schema";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('diary-tag')
export class DiaryTagController {

  constructor(
    private readonly diaryTagService: DiaryTagService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() tag: CreateTagDto) {
    return this.diaryTagService.create(req.user.id, tag);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    return this.diaryTagService.getAll(req.user.id);
  }

}
