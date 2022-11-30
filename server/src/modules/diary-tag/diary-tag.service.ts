import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiaryTag } from '../../schemas/diary-tag.schema';

@Injectable()
export class DiaryTagService {
  constructor(
    @InjectModel(DiaryTag.name)
    private readonly diaryTagModel: Model<DiaryTag>
  ) {
  }

  createUpdate(userId: string, tag: DiaryTag) {
    return this.diaryTagModel.findOneAndUpdate(
      { userId, id: tag.id }, { ...tag, userId }, { upsert: true, new: true }
    );
  }

  getAll(userId: string) {
    return this.diaryTagModel.find({ userId }).sort({ 'created': 'desc' });
  }
}
