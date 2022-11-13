import { Test, TestingModule } from '@nestjs/testing';
import { DiaryTagController } from './diary-tag.controller';

describe('DiaryTagController', () => {
  let controller: DiaryTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryTagController],
    }).compile();

    controller = module.get<DiaryTagController>(DiaryTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
