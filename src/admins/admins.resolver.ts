import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.args';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUserArgs } from 'src/users/dto/args/get-user.args';
import { AdminsService } from './admins.service';
import { Admin } from './models/admin';

@Resolver()
export class AdminsResolver {
    constructor(
        private readonly adminsService: AdminsService,
    ) {}

    @Query(() => Admin, { name: 'admin', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getAdmin(@CurrentUser() admin: Admin ,@Args() getAdminArgs: GetUserArgs): Promise<Admin> {
        return this.adminsService.getAdmin(admin,getAdminArgs)
    }

}
