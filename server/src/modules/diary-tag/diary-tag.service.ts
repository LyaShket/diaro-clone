import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiaryTag } from '../../schemas/diary-tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class DiaryTagService {
  constructor(
    @InjectModel(DiaryTag.name)
    private readonly diaryTagModel: Model<DiaryTag>
  ) {
  }

  create(userId: string, tag: CreateTagDto) {
    return this.diaryTagModel.create({ ...tag, userId });
  }

  getAll(userId: string) {
    return this.diaryTagModel.find({ userId }).sort({ 'created': 'desc' });
  }
}
