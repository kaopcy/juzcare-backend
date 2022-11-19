import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/models/user";

@ObjectType()
export class AuthUser extends User {
    @Field()
    accessToken: string
}