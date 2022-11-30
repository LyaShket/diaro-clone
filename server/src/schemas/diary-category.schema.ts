import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class DiaryCategory {
  @Prop()
  userId: string;

  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const DiaryCategorySchema = SchemaFactory.createForClass(DiaryCategory);
