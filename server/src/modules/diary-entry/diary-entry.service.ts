import { Injectable } from '@nestjs/common';
import { DiaryEntry } from '../../schemas/diary-entry.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DAY_IN_MILLISECONDS } from './diary-entry.constants';

@Injectable()
export class DiaryEntryService {
  constructor(
    @InjectModel(DiaryEntry.name)
    private readonly diaryEntryModel: Model<DiaryEntry>
  ) {
  }

  createUpdate(entry: DiaryEntry) {
    return this.diaryEntryModel.findOneAndUpdate({ id: entry.id }, entry, { upsert: true, new: true });
  }

  getAll() {
    return this.diaryEntryModel.find().sort({ 'created': 'desc' });
  }

  get(id: string) {
    return this.diaryEntryModel.findOne({ id });
  }

  search(categories: string[], tags: string[], moods: string[], timeFrom: number, timeTo: number) {
    const filter: FilterQuery<DiaryEntry> = {
      $and: [
        {
          created: {
            $gt: timeFrom,
            $lt: timeTo + DAY_IN_MILLISECONDS,
          }
        }
      ],
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
    if (moods.length > 0) {
      filter.$and.push({
        mood: {
          $in: moods
        },
      },)
    }

    return this.diaryEntryModel.find(filter).sort({ 'created': 'desc' });
  }
}
