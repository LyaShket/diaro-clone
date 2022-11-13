import { Test, TestingModule } from '@nestjs/testing';
import { DiaryTagService } from './diary-tag.service';

describe('DiaryTagService', () => {
  let service: DiaryTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiaryTagService],
    }).compile();

    service = module.get<DiaryTagService>(DiaryTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
