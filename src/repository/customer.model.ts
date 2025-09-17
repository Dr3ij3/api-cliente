import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Customer {
    @Prop({ require: true, unique: true })
    cpf: string;

    @Prop({ require: true })
    name: string;

    @Prop({ require: true })
    email: string;

    @Prop({ require: true })
    state: string;

    @Prop({ require: true })
    city: string;

    @Prop({ require: true, unique: true })
    telephone: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);