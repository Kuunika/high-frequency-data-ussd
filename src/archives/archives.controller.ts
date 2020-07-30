import { Controller, Get, InternalServerErrorException, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UnrecognizedArchiveFormatException } from '../common/exceptions/unrecognized-archive-format.exception';
import { ArchivesService } from './archives.service';

@Controller('archives')
export class ArchivesController {
    constructor(private readonly service: ArchivesService) { }

    private formatHeaders = {
        json: 'application/json',
        csv: 'application/csv'
    };

    @Get()
    async archiveAll(@Res() response: Response, @Query('format') format: string): Promise<string | void> {
        if (!this.formatHeaders[format]) {
            throw new UnrecognizedArchiveFormatException();
        }

        try {
            const payload = await this.service.archive(format);
            if (payload === null) {
                response.status(204).send();
            }
            response.setHeader('Content-Type', this.formatHeaders[format]);
            response.status(200).send(payload);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
