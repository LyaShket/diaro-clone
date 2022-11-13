import { Test, TestingModule } from '@nestjs/testing';
import { DiaryCategoryService } from './diary-category.service';

describe('DiaryCategoryService', () => {
  let service: DiaryCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiaryCategoryService],
    }).compile();

    service = module.get<DiaryCategoryService>(DiaryCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
