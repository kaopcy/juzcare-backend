import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateAdminInput {
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกอีเมล์' })
    @IsEmail()
    email: string
    
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ใช้' })
    @IsString()
    username: string
    
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
    @IsString()
    password: string
    
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกชื่อจริง' })
    @IsString()
    firstName: string
    
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกนามสกุล' })
    @IsString()
    lastName: string
}