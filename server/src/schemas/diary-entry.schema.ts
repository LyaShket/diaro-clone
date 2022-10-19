import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class DiaryEntry {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  labels: string[];

  @Prop()
  category: string[];

  @Prop()
  mood: number;

  @Prop()
  created: number;

  @Prop()
  updated: number;
}

export const DiaryEntrySchema = SchemaFactory.createForClass(DiaryEntry);
