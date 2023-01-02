import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateProfileDto } from '../auth/dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {
  }

  get(userId: string) {
    return this.userModel.findById(userId);
  }

  findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  create(registerDto: RegisterDto) {
    return this.userModel.create(registerDto);
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    await this.userModel.findByIdAndUpdate(userId, updateProfileDto);
    return this.get(userId);
  }
}
