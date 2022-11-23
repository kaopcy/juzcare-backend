import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from 'src/reports/models/report';
import { Trend, TrendDocument } from './models/trend';

@Injectable()
export class TrendsService {
    constructor(
        @InjectModel(Trend.name) private readonly trendModel: Model<TrendDocument>,
    ) { }

    async updateTrends(reports: Report[]): Promise<Report[]> {
        await this.trendModel.deleteMany({})
        await this.trendModel.create({reports: reports.map((r) => (r._id.toString()))})
        return
    }

    async getTrends(): Promise<Report[]> {
        return await this.trendModel.findOne()
    }
}