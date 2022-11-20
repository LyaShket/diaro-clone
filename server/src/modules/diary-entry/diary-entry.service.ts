import {Injectable} from '@nestjs/common';
import {DiaryEntry} from "../../schemas/diary-entry.schema";
import {FilterQuery, Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class DiaryEntryService {
  constructor(
    @InjectModel(DiaryEntry.name)
    private readonly diaryEntryModel: Model<DiaryEntry>
  ) {
  }

  createUpdate(entry: DiaryEntry) {
    return this.diaryEntryModel.findOneAndUpdate({id: entry.id}, entry, {upsert: true, new: true});
  }

  getAll() {
    return this.diaryEntryModel.find().sort({'created': 'desc'});
  }

  get(id: string) {
    return this.diaryEntryModel.findOne({id});
  }

  search(categories: string[], tags: string[]) {
    const filter: FilterQuery<DiaryEntry> = {
      $and: [],
    };

    if (categories.length > 0) {
      filter.$and.push({
        ['category.name']: {
          $in: categories
        },
      })
    }

    if (tags.length > 0) {
      filter.$and.push({
        ['tags.name']: {
          $in: tags
        },
      },)
    }

    return this.diaryEntryModel.find(filter).sort({'created': 'desc'});
  }
}
