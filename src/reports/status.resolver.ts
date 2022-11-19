import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/models/admin';
import { Status } from './models/status';

@Resolver(() => Status)
export class StatusResolver {
    constructor(
        private readonly adminsService: AdminsService
    ) { }

    @ResolveField(() => Admin)
    async admin(@Parent() status: Status) {
        return await this.adminsService.findById(status.admin._id)
    }
}
