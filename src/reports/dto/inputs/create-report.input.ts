import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateMediaInput } from "src/medias/dto/inputs/create-media.input"
import { Media } from "src/medias/models/media"

@InputType()
export class CreateReportInput {

    @Field()
    @IsNotEmpty({ message: 'กรุณาใส่รายละเอียด' })
    @IsString()
    detail: string

    @Field()
    @IsNotEmpty({ message: 'กรุณาใส่หัวข้อ' })
    @IsString()
    title: string

    @Field()
    @IsNotEmpty({ message: 'กรุณาใส่รายละเอียดของตำแหน่ง' })
    @IsString()
    locationDetail: string

    @Field()
    @IsNotEmpty({ message: 'กรุณาใส่ตำแหน่ง' })
    @IsString()
    location: string

    @Field(() => [String], {nullable: true})
    tags: string[]
    
    @Field(() => [CreateMediaInput], {name: 'medias', nullable: true})
    // @IsNotEmpty()
    medias: Media[]
}