import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import {DiaryTag} from "./diary-tag.schema";
import {ICategory} from "../../../frontend/src/app/interfaces/category";

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
  category: ICategory;

  @Prop()
  mood: string;

  @Prop()
  created: number;

  @Prop()
  updated: number;
}

export const DiaryEntrySchema = SchemaFactory.createForClass(DiaryEntry);
