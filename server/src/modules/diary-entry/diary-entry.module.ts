import {Module} from '@nestjs/common';
import {DiaryEntryController} from './diary-entry.controller';
import {DiaryEntryService} from './diary-entry.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DiaryEntry, DiaryEntrySchema} from "../../schemas/diary-entry.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: DiaryEntry.name, schema: DiaryEntrySchema}
    ])
  ],
  controllers: [DiaryEntryController],
  providers: [DiaryEntryService]
})
export class DiaryEntryModule {
}
