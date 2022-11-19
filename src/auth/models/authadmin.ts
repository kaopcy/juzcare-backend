import { Field, ObjectType } from "@nestjs/graphql";
import { Admin } from "src/admins/models/admin";

@ObjectType()
export class AuthAdmin extends Admin {
    @Field()
    accessToken: string
}