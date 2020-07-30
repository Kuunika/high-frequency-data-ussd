import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectedData } from '../common/schema/collected_data.schema';

@Injectable()
export class ArchivesService {
    constructor(@InjectModel(CollectedData.name) private readonly dataModel: Model<CollectedData>) { }

    async archive(format: string): Promise<{} | null> {
        const payload = await this.dump();
        if (payload.length) {
            return format === 'csv' ? this.toCsv(payload) : payload;
        }
        return null;
    }

    private dump(): Promise<CollectedData[]> {
        return this.dataModel.find().exec();
    }

    private toCsv(payload: CollectedData[]): string {
        const header = `${Object.keys(payload[0]).join(',')}\r\n`;
        const lines = payload.reduce((acc, val) => {
            const line = Object.values(val).join(',');
            return `${acc}${line}\r\n`;
        }, '');
        return `${header}${lines}`;
    }
}
