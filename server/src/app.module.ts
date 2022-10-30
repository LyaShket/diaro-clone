import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiaryEntryModule } from './modules/diary-entry/diary-entry.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DiaryEntryModule,
    MongooseModule.forRoot('mongodb://localhost:27017')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
