import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerdto } from '../../src/dto/create.customer.dto';
import { Customer } from '../../src/repository/customer.model';
import { CpfValidator } from '../../src/utils/cpf-validator';

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>, private cpfValidator: CpfValidator) { }

    async create(customer: CreateCustomerdto): Promise<Customer> {
        customer.cpf = customer.cpf.replace(/[\D]/g, '');
        this.cpfValidator.validate(customer.cpf);
        const customerExists = await this.customerModel.findOne({ cpf: customer.cpf })
        if (customerExists) {
            throw new HttpException('User already exists!,', HttpStatus.BAD_REQUEST);
        }
        return await this.customerModel.create(customer)
    }

    async retrieveCustomer(cpf: string): Promise<Customer> {
        this.cpfValidator.validate(cpf);
        const customerExists = await this.customerModel.findOne({ cpf: cpf })
        if (!customerExists) {
            throw new HttpException('User does not exist!,', HttpStatus.NOT_FOUND)
        }
        return customerExists
    }

   async updateCustomer(cpf: string, customerData: Partial<Customer>): Promise<Customer> {
        this.cpfValidator.validate(cpf);
        const customerExists = await this.customerModel.findOne({ cpf: cpf });
        if (!customerExists) {
            throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
        }

        // Remove CPF do objeto de atualização para evitar sua modificação
        const { cpf: _, ...updateData } = customerData;

        const updatedCustomer = await this.customerModel.findOneAndUpdate(
            { cpf: cpf },
            { $set: updateData },
            { new: true }
        );
        return updatedCustomer;
    }

    async deleteCustomer(cpf: string): Promise<{ message: string }> {
        this.cpfValidator.validate(cpf);
        const customerExists = await this.customerModel.findOne({ cpf: cpf });
        if (!customerExists) {
            throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
        }
        
        await this.customerModel.deleteOne({ cpf: cpf });
        return { message: 'Customer successfully deleted' };
    }
    
}