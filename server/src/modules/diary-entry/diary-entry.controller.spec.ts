import { Test, TestingModule } from '@nestjs/testing';
import { DiaryEntryController } from './diary-entry.controller';

describe('DiaryEntryController', () => {
  let controller: DiaryEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryEntryController],
    }).compile();

    controller = module.get<DiaryEntryController>(DiaryEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
