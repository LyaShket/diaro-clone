import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {
  }

  findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  create(registerDto: RegisterDto) {
    return this.userModel.create(registerDto);
  }
}
