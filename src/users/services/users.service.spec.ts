import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
            clear: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('Criar usuario com sucesso', async () => {
      const dto: CreateUserDto = { name: 'Jon', email: 'jon@test.com' };
      repository.findOneBy.mockResolvedValue(undefined);
      repository.save.mockResolvedValue({ id: 'uuid', ...dto });

      const result = await service.createUser(dto);
      expect(repository.findOneBy).toHaveBeenCalledWith({ email: dto.email });
      expect(repository.save).toHaveBeenCalledWith({
        name: dto.name,
        email: dto.email,
      });
      expect(result).toEqual({ id: 'uuid', ...dto });
    });

    it('Erro email do usuario já existe', async () => {
      const dto: CreateUserDto = { name: 'Jon', email: 'jon@test.com' };
      repository.findOneBy.mockResolvedValue({ id: 'uuid', ...dto });

      await expect(service.createUser(dto)).rejects.toThrow(BadRequestException);
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('Retornar todos os usuários', async () => {
      const users = [{ id: 'uuid', name: 'Jon', email: 'jon@test.com' }];
      repository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Retortar usuário pelo ID', async () => {
      const user = { id: 'uuid', name: 'Jon', email: 'jon@test.com' };
      repository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne('uuid');
      expect(result).toEqual(user);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'uuid' });
    });

    it('Retornar error usuario não cadastrado', async () => {
      repository.findOneBy.mockResolvedValue(undefined);

      await expect(service.findOne('uuid')).rejects.toThrow(BadRequestException);
    });
  });
});
