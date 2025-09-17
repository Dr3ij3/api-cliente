import { CustomerService } from '../src/service/customer.service';
import { CpfValidator } from '../src/utils/cpf-validator';
import { customerDataMock, expectedCustomer } from './mocks/customer.mocks';

describe('CustomerService', () => {
  let sut: CustomerService;
  let customerModel;
  let cpfValidator: CpfValidator;

  beforeEach(() => {
    customerModel = {
      create: jest.fn(),
      findOne: jest.fn(),
    }

    cpfValidator = {
      validate: jest.fn()
    };
    sut = new CustomerService(customerModel, cpfValidator);
  })

  describe('create', () => {
    it('should create a customer with name and cpf', async () => {
      const spyCustomerModel = jest
        .spyOn(customerModel, 'create')
        .mockResolvedValueOnce(customerDataMock)

      const spyValidateCpf = jest
        .spyOn(cpfValidator, 'validate')
        .mockResolvedValueOnce(true as never)

      expect(await sut.create(customerDataMock)).toStrictEqual(customerDataMock)
      expect(spyCustomerModel).toHaveBeenCalledWith(customerDataMock)
      expect(spyValidateCpf).toHaveBeenCalledWith(customerDataMock.cpf)
    })
    it('should user is not created', async () => {
      customerModel.findOne.mockRejectedValueOnce(expectedCustomer)
      const spyCustomerModel = jest
        .spyOn(customerModel, 'create')
        .mockResolvedValueOnce(expectedCustomer)

      const spyValidateCpf = jest
        .spyOn(cpfValidator, 'validate')
        .mockResolvedValueOnce(true as never)

      expect(await sut.create(expectedCustomer)).rejects.toThrowError('User already exists!')
      expect(customerModel.findOne).toHaveBeenCalledWith({ cpf: expectedCustomer.cpf });
      expect(spyCustomerModel).toHaveBeenCalled
      expect(spyValidateCpf).toHaveBeenCalledWith(expectedCustomer.cpf)
    })
  })

  describe('retrieveCustomer', () => {
    it('should the user already exists', async () => {
      const cpf = '41996940805'
      const spyCustomerModel = jest
        .spyOn(customerModel, 'findOne')
        .mockRejectedValueOnce(expectedCustomer)
      expect(await sut.retrieveCustomer(cpf)).toStrictEqual(expectedCustomer)
      expect(spyCustomerModel).toHaveBeenCalledWith(cpf)
    })
    it('should find a user by CPF', async () => {
      const cpf = '41996940805'
      const spyCustomerModel = jest
        .spyOn(customerModel, 'findOne')
        .mockRejectedValueOnce(null)
      expect(await sut.retrieveCustomer(cpf)).rejects.toThrowError('User does not exist!,')
      expect(spyCustomerModel).not.toHaveBeenCalled()
    })
  })
})
