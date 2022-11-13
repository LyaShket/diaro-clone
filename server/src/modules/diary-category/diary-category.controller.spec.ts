import { Test, TestingModule } from '@nestjs/testing';
import { DiaryCategoryController } from './diary-category.controller';

describe('DiaryCategoryController', () => {
  let controller: DiaryCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryCategoryController],
    }).compile();

    controller = module.get<DiaryCategoryController>(DiaryCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
