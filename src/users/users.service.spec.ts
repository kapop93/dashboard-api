import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interace';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { UserService } from './users.service';
import { TYPES } from '../types';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';

const ConfigServoceMock: IConfigService = {
	get: jest.fn()
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn()
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServoceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockResolvedValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1
			})
		);
		const createdUser = await userService.createUser({
			email: 'a@a.ru',
			name: 'Kirill',
			password: '1'
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});
	it('ValidateUser-success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await userService.validateUser({
			email: 'a@a.ru',
			password: '1'
		});
		expect(res).toBeTruthy();
	});
	it('ValidateUser-wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await userService.validateUser({
			email: 'a@a.ru',
			password: '2'
		});
		expect(res).toBeFalsy();
	});

	it('ValidateUser-wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await userService.validateUser({
			email: 'a2@a.ru',
			password: '2'
		});
		expect(res).toBeFalsy();
	});
});
