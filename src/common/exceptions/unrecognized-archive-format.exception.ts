import { BadRequestException } from "@nestjs/common";

export class UnrecognizedArchiveFormatException extends BadRequestException {
    constructor() {
        super(`Unrecognized archive format specified. Expected csv or json.`);
    }
}