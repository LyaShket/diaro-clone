import {Body, Controller, Get, Post} from '@nestjs/common';

@Controller('diary-entry')
export class DiaryEntryController {

  entries = [];

  @Post()
  create(@Body() entry: any) {
    return this.entries.push(entry);
  }

  @Get()
  getAll() {
    return this.entries;
  }

}
