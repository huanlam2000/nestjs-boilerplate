import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const logger = new Logger(bootstrap.name);
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	await app.listen(configService.get('PORT'), () => {
		logger.log(`Application is running on port: ${configService.get('PORT')}`);
	});
}
bootstrap();
