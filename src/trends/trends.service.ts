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
        // const trend = await this.trendModel.create({reports: [reports[0]._id]})
        // if (reports.length - 1) {
        //     for (let i = 1; i < reports.length; i++) {
        //         await this.trendModel.findByIdAndUpdate(trend._id,{ $push : {reports : reports[i]._id}})
        //     }
        // }
        // console.log(await this.trendModel.findById(trend._id));
        
        return
    }

    async getTrends(): Promise<Report[]> {
        return await this.trendModel.findOne()
    }
}
