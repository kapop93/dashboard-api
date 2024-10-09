import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<any>;

	constructor() {
		this.logger = new Logger({
			//displayLoggerName: false,      // Скрыть имя логгера
			//displayFilePath: 'hidden',     // Скрыть путь к файлу, возможные значения: 'hidden', 'display', true, false
			//displayFunctionName: false,    // Скрыть имя функции
			//displayInstanceName:false      //удалено, так как больше не поддерживается
		});
	}

	// Общий метод логирования, если типизация аргументов не важна
	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	// Ошибки и отправка в Sentry или Rollbar
	error(...args: unknown[]): void {
		// Можно добавить отправку ошибки в Sentry или Rollbar здесь
		this.logger.error(...args);
	}

	// Предупреждения
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
