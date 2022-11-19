import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MediasService } from 'src/medias/medias.service';
import { Media } from 'src/medias/models/media';
import { Review } from './models/review';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly mediasService: MediasService) { }

  @ResolveField(() => [Media], { nullable: true })
  async medias(@Parent() review: Review) {
    return await this.mediasService.getMedias({
      _ids: review.medias.map((m) => m._id.toString()),
    });
  }
}
