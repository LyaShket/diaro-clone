import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import {DiaryEntryService} from "./diary-entry.service";
import {DiaryEntry} from "../../schemas/diary-entry.schema";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('diary-entry')
export class DiaryEntryController {

  constructor(
    private readonly diaryEntryService: DiaryEntryService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() entry: DiaryEntry) {
    return this.diaryEntryService.create(req.user.id, entry);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req, @Param('id') _id: string, @Body() entry: UpdateEntryDto) {
    return this.diaryEntryService.update(req.user.id, _id, entry);
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
  get(@Request() req, @Param('id') _id: string) {
    return this.diaryEntryService.get(req.user.id, _id);
  }

  @Get('public/:id')
  getPublic(@Param('id') _id: string) {
    return this.diaryEntryService.getPublic(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') _id: string) {
    return this.diaryEntryService.delete(req.user.id, _id);
  }

}
