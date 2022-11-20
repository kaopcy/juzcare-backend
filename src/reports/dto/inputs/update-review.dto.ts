import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateMediaInput } from 'src/medias/dto/inputs/create-media.input';
import { Media } from 'src/medias/models/media';

@InputType()
export class UpdateReviewReportInput {
  @Field()
  @IsNotEmpty({ message: 'ไอดีรายงานว่างอยู่' })
  @IsString()
  reportId: string;

  @Field()
  @IsNotEmpty({ message: 'รายละเอียดว่างอยู่' })
  @IsString()
  description: string;

  @Field(() => [CreateMediaInput], { nullable: true })
  medias: Media[];

  @Field()
  @IsNotEmpty({ message: 'ยังไม่มีจำนวนไลก์' })
  @IsNumber()
  star: number;
}
