import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceController } from './get-balance.controller';

describe('GetBalanceController', () => {
  let controller: GetBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetBalanceController],
    }).compile();

    controller = module.get<GetBalanceController>(GetBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
