import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetLocationArgs } from './dto/args/get-location.args';
import { CreateLocationInput } from './dto/inputs/create-location.input';
import { Location, LocationDocument } from './models/location';

@Injectable()
export class LocationsService {
    constructor(
        @InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>, 
    ) {}

    async getLocation(getLocationArgs: GetLocationArgs): Promise<Location> {
        const location = await this.locationModel.findById(getLocationArgs._id)
        if (!location) {
            throw new NotFoundException('ไม่สามารถหาไอดีของสถานที่นั้นได้')
        }
        return location
    }

    async getAllLocations(): Promise<Location[]> {
        return await this.locationModel.find({})
    }

    async createLocation(createLocationData: CreateLocationInput): Promise<Location> {
        return await this.locationModel.create(createLocationData)
    }

    async findById(_id: string): Promise<Location>{
        return this.locationModel.findById(_id)
    }
}
