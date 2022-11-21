import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/models/admin';
import { Status } from './models/status';

@Resolver(() => Status)
export class StatusResolver {
    constructor(
        private readonly adminsService: AdminsService
    ) { }

    @ResolveField(() => Admin, { nullable: true })
    async admin(@Parent() status: Status) {
        if (!status.admin) {
            return {
                _id: "null",
                email: "null",
                password: "null",
                firstName: "null",
                lastName: "null",
                createdAt: "null",
                updatedAt: "null",
                __v: "null",
            }
        }
        return await this.adminsService.findById(status.admin._id)
    }
}
