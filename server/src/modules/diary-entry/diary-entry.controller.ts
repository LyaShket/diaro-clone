import {Body, Controller, Get, Param, Post} from '@nestjs/common';

@Controller('diary-entry')
export class DiaryEntryController {

  entries = [];

  @Post()
  create(@Body() entry: any) {
    const entryIndex = this.entries.findIndex(i => i?.id === entry?.id);
    if (entryIndex === -1) {
      this.entries.unshift(entry);
      return;
    }

    this.entries[entryIndex] = entry;
  }

  @Get()
  getAll() {
    return this.entries;
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.entries.find(i => i?.id === id);
  }

}
