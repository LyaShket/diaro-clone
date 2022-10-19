import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  avatar: string;

  @Prop()
  created: string;

  @Prop()
  updated: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
