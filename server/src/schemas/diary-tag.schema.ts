import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class DiaryTag {
  @Prop()
  userId: string;

  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const DiaryTagSchema = SchemaFactory.createForClass(DiaryTag);
