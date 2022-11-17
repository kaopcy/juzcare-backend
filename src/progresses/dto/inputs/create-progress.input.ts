import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateMediaInput } from "src/medias/dto/inputs/create-media.input"
import { Media } from "src/medias/models/media"

@InputType()
export class CreateProgressInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    reportId: string

    @Field()
    @IsNotEmpty({ message: 'please fill detail' })
    @IsString()
    detail: string

    // @Field(() => [String])
    // @IsNotEmpty()
    // imageUrls: []

    @Field(() => [CreateMediaInput], {name: 'medias', nullable: true})
    // @IsNotEmpty()
    medias: Media[]
}