import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateMediaInput } from "src/medias/dto/inputs/create-media.input"
import { Media } from "src/medias/models/media"

@InputType()
export class CreateReportInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    detail: string

    @Field()
    @IsNotEmpty()
    @IsString()
    title: string

    @Field()
    @IsNotEmpty()
    @IsString()
    locationDetail: string

    @Field()
    @IsNotEmpty()
    @IsString()
    location: string

    @Field(() => [String], {nullable: true})
    tags: string[]
    
    @Field(() => [CreateMediaInput], {name: 'medias', nullable: true})
    // @IsNotEmpty()
    medias: Media[]
}