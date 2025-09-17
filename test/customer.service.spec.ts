import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/service/customer.service';
import { Customer } from '../src/repository/customer.model';
import { CpfValidator } from '../src/utils/cpf-validator';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let model: any;
  let cpfValidator: CpfValidator;

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
      providers: [
        CustomerService,
        {
          provide: getModelToken(Customer.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
        {
          provide: CpfValidator,
          useValue: {
            validate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    model = module.get(getModelToken(Customer.name));
    cpfValidator = module.get<CpfValidator>(CpfValidator);
  });

  describe('create', () => {
    it('should create a customer successfully', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);
      jest.spyOn(model, 'create').mockResolvedValue(mockCustomer as any);

      const result = await service.create(mockCustomer);
      expect(result).toEqual(mockCustomer);
    });

    it('should throw if customer already exists', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockCustomer as any);

      await expect(service.create(mockCustomer)).rejects.toThrow(
        new HttpException('User already exists!,', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('retrieveCustomer', () => {
    it('should retrieve a customer successfully', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockCustomer as any);

      const result = await service.retrieveCustomer('12345678900');
      expect(result).toEqual(mockCustomer);
    });

    it('should throw if customer does not exist', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      await expect(service.retrieveCustomer('12345678900')).rejects.toThrow(
        new HttpException('User does not exist!,', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer successfully', async () => {
      const updateData = { name: 'Jane Doe' };
      const updatedCustomer = { ...mockCustomer, ...updateData };

      jest.spyOn(model, 'findOne').mockResolvedValue(mockCustomer as any);
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue(updatedCustomer as any);

      const result = await service.updateCustomer('12345678900', updateData);
      expect(result).toEqual(updatedCustomer);
    });

    it('should throw if customer does not exist when updating', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      await expect(service.updateCustomer('12345678900', { name: 'Jane Doe' })).rejects.toThrow(
        new HttpException('User does not exist!', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer successfully', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockCustomer as any);
      jest.spyOn(model, 'deleteOne').mockResolvedValue({ deletedCount: 1 } as any);

      const result = await service.deleteCustomer('12345678900');
      expect(result).toEqual({ message: 'Customer successfully deleted' });
    });

    it('should throw if customer does not exist when deleting', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      await expect(service.deleteCustomer('12345678900')).rejects.toThrow(
        new HttpException('User does not exist!', HttpStatus.NOT_FOUND),
      );
    });
  });
});