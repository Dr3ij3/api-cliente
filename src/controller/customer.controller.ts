import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerdto, UpdateCustomerDto } from '../../src/dto/create.customer.dto';
import { Customer } from '../../src/repository/customer.model';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Post()
  @HttpCode(201)
  async createCustomer(@Body() payload: CreateCustomerdto): Promise<Customer> {
    const createCustomer = await this.customerService.create(payload)
    return createCustomer;
  }

  @Get(':cpf')
  @HttpCode(201)
  async findOne(@Param('cpf') cpf: string): Promise<Customer> {
    return await this.customerService.retrieveCustomer(cpf)
  }

  // @Put(':cpf')
  // async updateCustomer(@Param('cpf') cpf: string,@Body() customerData: Partial<Customer>) {
  //   return await this.customerService.updateCustomer(cpf, customerData);
  // }

  @Put(':cpf')
  @HttpCode(200)
  async updateCustomer(@Param('cpf') cpf: string, @Body() customerData: UpdateCustomerDto): Promise<Customer> {
      return await this.customerService.updateCustomer(cpf, customerData);
  }

  @Delete(':cpf')
  @HttpCode(200)
  async deleteCustomer(@Param('cpf') cpf: string): Promise<{ message: string }> {
    return await this.customerService.deleteCustomer(cpf);
  }
}
