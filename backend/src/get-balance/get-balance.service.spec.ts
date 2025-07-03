import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceService } from './get-balance.service';

describe('GetBalanceService', () => {
  let service: GetBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBalanceService],
    }).compile();

    service = module.get<GetBalanceService>(GetBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
