import { Test, TestingModule } from '@nestjs/testing';
import { AvatarsResolver } from './avatars.resolver';

describe('AvatarsResolver', () => {
  let resolver: AvatarsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvatarsResolver],
    }).compile();

    resolver = module.get<AvatarsResolver>(AvatarsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
