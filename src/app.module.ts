import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { database_config } from './configs/configuration.config';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				NODE_ENV: Joi.valid(
					'development',
					'production',
					'test',
					'provision',
					'staging',
				).default('development'),
				PORT: Joi.number().port().required(),
				DATABASE_PORT: Joi.number().port().required(),
			}),

			validationOptions: {
				abortEarly: false,
			},
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
			load: [database_config],
			cache: true,
			expandVariables: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
