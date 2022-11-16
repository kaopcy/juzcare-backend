import { Test, TestingModule } from '@nestjs/testing';
import { ProgressesResolver } from './progresses.resolver';

describe('ProgressesResolver', () => {
  let resolver: ProgressesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressesResolver],
    }).compile();

    resolver = module.get<ProgressesResolver>(ProgressesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
