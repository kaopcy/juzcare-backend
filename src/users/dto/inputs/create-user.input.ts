import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกอีเมล์' })
  @IsEmail({}, { message: 'กรุณากรอกอีเมล์เท่านั้น' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกรูปแบบไอดี' })
  @IsString()
  emailType: string;

  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ใช้' })
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกชื่อจริง' })
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกนามสกุล' })
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกเบอร์โทร' })
  @IsString()
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'กรุณากรอกตำแหน่งงาน' })
  @IsString()
  role: string;
}
