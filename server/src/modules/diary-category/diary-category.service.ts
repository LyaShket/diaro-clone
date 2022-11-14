import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {DiaryTag} from "../../schemas/diary-tag.schema";
import {Model} from "mongoose";
import {DiaryCategory} from "../../schemas/diary-category.schema";

@Injectable()
export class DiaryCategoryService {

  constructor(
    @InjectModel(DiaryCategory.name)
    private readonly diaryCategoryModel: Model<DiaryCategory>
  ) {
  }

  createUpdate(category: DiaryCategory) {
    return this.diaryCategoryModel.findOneAndUpdate({id: category.id}, category, {upsert: true, new: true});
  }

  getAll() {
    return this.diaryCategoryModel.find().sort({'created': 'desc'});
  }

}
