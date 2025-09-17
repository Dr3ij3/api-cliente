import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './controller/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './repository/customer.model';
import { CpfValidator } from 'src/utils/cpf-validator';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],

  controllers: [CustomerController],
  providers: [CustomerService, CpfValidator]
})
export class CustomerModule { }
