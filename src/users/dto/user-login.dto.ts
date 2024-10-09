import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'не веерно указан email' })
	email: string;
	@IsString()
	password: string;
}
