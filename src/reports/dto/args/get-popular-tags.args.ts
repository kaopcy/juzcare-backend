import { ArgsType, Field } from "@nestjs/graphql";
@ArgsType()
export class GetPopularTagsArgs {
    @Field()
    name: string
}