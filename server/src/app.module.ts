import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiaryEntryModule } from './modules/diary-entry/diary-entry.module';

@Module({
  imports: [DiaryEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
