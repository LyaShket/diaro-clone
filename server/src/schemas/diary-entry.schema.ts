import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import {DiaryTag} from "./diary-tag.schema";
import {DiaryCategory} from "./diary-category.schema";

@Schema()
export class DiaryEntry {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  body: string;

  @Prop()
  text: string;

  @Prop()
  tags: DiaryTag[];

  @Prop({ type: Object })
  category: DiaryCategory;

  @Prop()
  mood: string;

  @Prop()
  created: number;

  @Prop()
  updated: number;
}

export const DiaryEntrySchema = SchemaFactory.createForClass(DiaryEntry);
