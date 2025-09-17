import { Injectable } from '@nestjs/common';
import { Customer } from '../customer.model';

@Injectable()
export class InMemoryCustomerRepository {
  private customers: Customer[] = [];

  async create(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return customer;
  }

  async findOne(filter: { cpf: string }): Promise<Customer | null> {
    const customer = this.customers.find(c => c.cpf === filter.cpf);
    return customer || null;
  }

   async findOneAndUpdate(filter: { cpf: string }, updateData: Partial<Customer>): Promise<Customer | null> {
    const customerIndex = this.customers.findIndex(c => c.cpf === filter.cpf);
    if (customerIndex === -1) return null;

    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updateData
    };

    return this.customers[customerIndex];
  }

  async deleteOne(filter: { cpf: string }): Promise<boolean> {
    const initialLength = this.customers.length;
    this.customers = this.customers.filter(c => c.cpf !== filter.cpf);
    return initialLength > this.customers.length;
  }
}
