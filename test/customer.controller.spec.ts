import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../src/controller/customer.controller';
import { CustomerService } from '../src/service/customer.service';
import { CreateCustomerdto, UpdateCustomerDto } from '../src/dto/create.customer.dto';
import { Customer } from '../src/repository/customer.model';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockCustomer = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '11999999999',
    cpf: '12345678900',
    state: 'SP',
    city: 'São Paulo',
    telephone: '11988887777'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{
        provide: CustomerService,
        useValue: {
          create: jest.fn(),
          retrieveCustomer: jest.fn(),
          updateCustomer: jest.fn(),
          deleteCustomer: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  describe('createCustomer', () => {
    it('should create a customer successfully', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockCustomer as Customer);
      
      const result = await controller.createCustomer(mockCustomer as CreateCustomerdto);
      expect(result).toEqual(mockCustomer);
      expect(service.create).toHaveBeenCalledWith(mockCustomer);
    });
  });

  describe('findOne', () => {
    it('should find a customer by CPF', async () => {
      jest.spyOn(service, 'retrieveCustomer').mockResolvedValue(mockCustomer as Customer);
      
      const result = await controller.findOne('12345678900');
      expect(result).toEqual(mockCustomer);
      expect(service.retrieveCustomer).toHaveBeenCalledWith('12345678900');
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer successfully', async () => {
      const updateData: UpdateCustomerDto = {
        name: 'Jane Doe',
        email: 'jane@example.com'
      };
      const updatedCustomer = { ...mockCustomer, ...updateData };
      
      jest.spyOn(service, 'updateCustomer').mockResolvedValue(updatedCustomer as Customer);
      
      const result = await controller.updateCustomer('12345678900', updateData);
      expect(result).toEqual(updatedCustomer);
      expect(service.updateCustomer).toHaveBeenCalledWith('12345678900', updateData);
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer successfully', async () => {
      const deleteResponse = { message: 'Customer successfully deleted' };
      jest.spyOn(service, 'deleteCustomer').mockResolvedValue(deleteResponse);
      
      const result = await controller.deleteCustomer('12345678900');
      expect(result).toEqual(deleteResponse);
      expect(service.deleteCustomer).toHaveBeenCalledWith('12345678900');
    });
  });
});