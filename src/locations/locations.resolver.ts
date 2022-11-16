import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetLocationArgs } from './dto/args/get-location.args';
import { CreateLocationInput } from './dto/inputs/create-location.input';
import { LocationsService } from './locations.service';
import { Location } from './models/location';

@Resolver(() => Location)
export class LocationsResolver {
    constructor(
        private readonly locationsService: LocationsService,
    ) {}

    @Mutation(() => Location)
    async createLocation(@Args('locationData') locationData: CreateLocationInput): Promise<Location> {
        return await this.locationsService.createLocation(locationData)
    }

    @Query(() => Location)
    async location(@Args() getLocationArgs:GetLocationArgs): Promise<Location> {
        return await this.locationsService.getLocation(getLocationArgs)
    }

    @Query(() => [Location])
    async getAllLocations(): Promise<Location[]> {
        return await this.locationsService.getAllLocations()
    }
}
