import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

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
  tags: string[];

  @Prop()
  category: string;

  @Prop()
  mood: string;

  @Prop()
  created: number;

  @Prop()
  updated: number;
}

export const DiaryEntrySchema = SchemaFactory.createForClass(DiaryEntry);
