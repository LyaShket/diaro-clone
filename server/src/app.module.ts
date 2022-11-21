import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiaryEntryModule } from './modules/diary-entry/diary-entry.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DiaryTagModule } from './modules/diary-tag/diary-tag.module';
import { DiaryCategoryModule } from './modules/diary-category/diary-category.module';

@Module({
  imports: [
    DiaryEntryModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
    DiaryTagModule,
    DiaryCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
