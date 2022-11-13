import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DiaryTag} from "../../schemas/diary-tag.schema";

@Injectable()
export class DiaryTagService {
  constructor(
    @InjectModel(DiaryTag.name)
    private readonly diaryTagModel: Model<DiaryTag>
  ) {
  }

  createUpdate(tag: DiaryTag) {
    return this.diaryTagModel.findOneAndUpdate({id: tag.id}, tag, {upsert: true, new: true});
  }

  getAll() {
    return this.diaryTagModel.find().sort({'created': 'desc'});
  }
}
