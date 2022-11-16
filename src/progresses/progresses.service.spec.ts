import { Test, TestingModule } from '@nestjs/testing';
import { ProgressesService } from './progresses.service';

describe('ProgressesService', () => {
  let service: ProgressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressesService],
    }).compile();

    service = module.get<ProgressesService>(ProgressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
