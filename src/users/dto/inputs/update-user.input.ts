import { Field, ID, InputType } from "@nestjs/graphql"
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"


@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    @IsNotEmpty()
    @IsString()
    _id: string

    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    emailType?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firstName?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastName?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phone?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    role?: string
    
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isBannned?: boolean
}