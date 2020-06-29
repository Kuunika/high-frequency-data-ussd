import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
@Schema({
    collection: 'data_entry_permissions'
})
export class DataEntryPermission extends Document{
    @Prop()
    permission: string
}

export const DataEntryPermissionSchema = SchemaFactory.createForClass(DataEntryPermission);