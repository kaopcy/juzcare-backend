import { Test, TestingModule } from '@nestjs/testing';
import { AdminsResolver } from './admins.resolver';

describe('AdminsResolver', () => {
  let resolver: AdminsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsResolver],
    }).compile();

    resolver = module.get<AdminsResolver>(AdminsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
