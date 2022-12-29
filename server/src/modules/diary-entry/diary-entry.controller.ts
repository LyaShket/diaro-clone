import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import {DiaryEntryService} from "./diary-entry.service";
import {DiaryEntry} from "../../schemas/diary-entry.schema";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('diary-entry')
export class DiaryEntryController {

  constructor(
    private readonly diaryEntryService: DiaryEntryService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUpdate(@Request() req, @Body() entry: DiaryEntry) {
    return this.diaryEntryService.createUpdate(req.user.id, entry);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    return this.diaryEntryService.getAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  search(@Request() req, @Query() query: any) {
    const categories = query.category ? query.category.split(',') : [];
    const tags = query.tag ? query.tag.split(',') : [];
    const moods = query.mood ? query.mood.split(',') : [];
    const timeFrom = query.timeFrom ? +query.timeFrom : 0;
    const timeTo = query.timeTo ? +query.timeTo : Infinity;
    const text = query.text || '';
    return this.diaryEntryService.search(req.user.id, categories, tags, moods, timeFrom, timeTo, text);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  get(@Request() req, @Param('id') id: string) {
    return this.diaryEntryService.get(req.user.id, id);
  }

  @Get('public/:id')
  getPublic(@Param('id') id: string) {
    return this.diaryEntryService.getPublic(id);
  }

}
