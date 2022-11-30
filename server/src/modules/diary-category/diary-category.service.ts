import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DiaryTag } from '../../schemas/diary-tag.schema';
import { Model } from 'mongoose';
import { DiaryCategory } from '../../schemas/diary-category.schema';

@Injectable()
export class DiaryCategoryService {

  constructor(
    @InjectModel(DiaryCategory.name)
    private readonly diaryCategoryModel: Model<DiaryCategory>
  ) {
  }

  createUpdate(userId: string, category: DiaryCategory) {
    return this.diaryCategoryModel.findOneAndUpdate(
      { userId, id: category.id }, { ...category, userId }, { upsert: true, new: true }
    );
  }

  getAll(userId: string) {
    return this.diaryCategoryModel.find({ userId }).sort({ 'created': 'desc' });
  }

}
