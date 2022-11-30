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

  createUpdate(userId: string, entry: DiaryEntry) {
    return this.diaryEntryModel.findOneAndUpdate({ userId, id: entry.id }, { ...entry, userId }, { upsert: true, new: true });
  }

  getAll(userId: string) {
    return this.diaryEntryModel.find({ userId }).sort({ 'created': 'desc' });
  }

  get(userId: string, id: string) {
    return this.diaryEntryModel.findOne({ userId, id });
  }

  search(userId: string, categories: string[], tags: string[], moods: string[], timeFrom: number, timeTo: number, text: string) {
    const filter: FilterQuery<DiaryEntry> = {
      $and: [
        { userId },
        {
          created: {
            $gt: timeFrom,
            $lt: timeTo + DAY_IN_MILLISECONDS,
          }
        },
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
    if (text.length > 0) {
      filter.$and.push({
        $or: [
          { title: { $regex: text, $options: 'i' } },
          { text: { $regex: text, $options: 'i' } },
        ]
      },)
    }

    return this.diaryEntryModel.find(filter).sort({ 'created': 'desc' });
  }
}
