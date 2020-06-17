import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    collection:'permitted_users'
})
export class PermittedUser extends Document{
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    phonenumber: string;

    @Prop()
    facility: Types.ObjectId;
}

export const PermittedUserSchema = SchemaFactory.createForClass(PermittedUser);