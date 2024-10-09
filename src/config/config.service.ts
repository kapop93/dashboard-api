import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interace';
import { config, DotenvConfigOptions, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private Logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.Logger.error('[ConfigService] Не удалось прочитать файл .env или он не существует');
		} else {
			this.Logger.log('[ConfigService] Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
