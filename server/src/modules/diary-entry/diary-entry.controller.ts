import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {DiaryEntryService} from "./diary-entry.service";
import {DiaryEntry} from "../../schemas/diary-entry.schema";

@Controller('diary-entry')
export class DiaryEntryController {

  constructor(
    private readonly diaryEntryService: DiaryEntryService
  ) {
  }

  @Post()
  createUpdate(@Body() entry: DiaryEntry) {
    console.log(entry);
    return this.diaryEntryService.createUpdate(entry);
  }

  @Get()
  getAll() {
    return this.diaryEntryService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.diaryEntryService.get(id);
  }

}
