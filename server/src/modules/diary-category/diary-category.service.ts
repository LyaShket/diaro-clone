import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DiaryTag } from '../../schemas/diary-tag.schema';
import { Model } from 'mongoose';
import { DiaryCategory } from '../../schemas/diary-category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class DiaryCategoryService {

  constructor(
    @InjectModel(DiaryCategory.name)
    private readonly diaryCategoryModel: Model<DiaryCategory>
  ) {
  }

  create(userId: string, category: CreateCategoryDto) {
    return this.diaryCategoryModel.create({ ...category, userId });
  }

  getAll(userId: string) {
    return this.diaryCategoryModel.find({ userId }).sort({ 'created': 'desc' });
  }

}
