import { Field, ID, InputType } from "@nestjs/graphql"
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"


@InputType()
export class UpdateUserInput {
    // @Field(() => ID)
    // @IsNotEmpty({ message: 'ไอดีว่างอยู่' })
    // @IsString()
    // _id: string

    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'อีเมล์ว่างอยู่' })
    @IsString()
    email?: string
    
    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'รูปแบบไอดีว่างอยู่' })
    @IsString()
    emailType?: string
    
    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'ชื่อผู้ใช้ว่างอยู่' })
    @IsString()
    username?: string
    
    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'ชื่อจริงว่างอยู่' })
    @IsString()
    firstName?: string
    
    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'นามสกุลว่างอยู่' })
    @IsString()
    lastName?: string
    
    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'เบอร์โทรว่างอยู่' })
    @IsString()
    phone?: string
    
    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'ตำแหน่งงานว่างอยู่' })
    @IsString()
    role?: string
    
    @Field({ nullable: true })
    @IsOptional()
    // @IsNotEmpty({ message: 'สถานะไอดีว่างอยู่' })
    @IsBoolean()
    isBannned?: boolean
}