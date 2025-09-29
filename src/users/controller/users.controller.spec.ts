import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: Partial<Record<keyof UsersService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      createUser: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      removeAllUsers: jest.fn(),
      removeUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.createUser and return user', async () => {
      const dto: CreateUserDto = { name: 'Jon', email: 'jon@test.com' };
      const mockResult = { id: 'uuid', ...dto };
      service.createUser.mockResolvedValue(mockResult);

      const result = await controller.create(dto);
      expect(service.createUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });

    it('should throw error if service throws', async () => {
      const dto: CreateUserDto = { name: 'Jon', email: 'jon@test.com' };
      service.createUser.mockRejectedValue(new BadRequestException('Email já cadastrado'));

      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 'uuid', name: 'Jon', email: 'jon@test.com' }];
      service.findAll.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return user by id', async () => {
      const user = { id: 'uuid', name: 'Jon', email: 'jon@test.com' };
      service.findOne.mockResolvedValue(user);

      const result = await controller.findOne('uuid');
      expect(service.findOne).toHaveBeenCalledWith('uuid');
      expect(result).toEqual(user);
    });

    it('should throw error if service throws', async () => {
      service.findOne.mockRejectedValue(new BadRequestException('Usuário não encontrado'));

      await expect(controller.findOne('uuid')).rejects.toThrow(BadRequestException);
    });
  });

});
